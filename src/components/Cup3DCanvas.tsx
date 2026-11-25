import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Cup3DCanvasProps {
  cupColor?: string;
  sleeveColor?: string;
  lidColor?: string;
  size?: 'S' | 'M' | 'L';
  className?: string;
}

export const Cup3DCanvas: React.FC<Cup3DCanvasProps> = ({
  cupColor = '#173824',
  sleeveColor = '#E8DAC2',
  lidColor = '#0F2417',
  size = 'M',
  className = 'w-full h-80 sm:h-[420px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeScales = { S: 0.9, M: 1.05, L: 1.18 };

  useEffect(() => {
    if (!containerRef.current) return;

    const width  = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 9.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping        = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    containerRef.current.replaceChildren(renderer.domElement);

    // ── Lighting ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff8f0, 1.4));
    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.9);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xc88342, 2.4);
    rimLight.position.set(-6, 2, -4);
    scene.add(rimLight);
    const bounceLight = new THREE.DirectionalLight(0xfdfbf7, 0.95);
    bounceLight.position.set(0, -6, 4);
    scene.add(bounceLight);

    // ── Cup Group ──────────────────────────────────────────────────────────
    const cupGroup = new THREE.Group();
    scene.add(cupGroup);

    // ═══════════════════════════════════════════════════════════════════════
    //  SLEEVE TEXTURE  –  Kraft paper + exact vector logo
    // ═══════════════════════════════════════════════════════════════════════
    const TEX_W = 2048;
    const TEX_H = 1024;
    const sleeveCanvas = document.createElement('canvas');
    sleeveCanvas.width  = TEX_W;
    sleeveCanvas.height = TEX_H;
    const ctx = sleeveCanvas.getContext('2d')!;

    // ── Background: warm kraft paper ───────────────────────────────────────
    ctx.fillStyle = sleeveColor;
    ctx.fillRect(0, 0, TEX_W, TEX_H);

    // Fine horizontal paper-grain lines
    ctx.strokeStyle = 'rgba(31,18,11,0.035)';
    ctx.lineWidth   = 1.5;
    for (let y = 0; y < TEX_H; y += 7) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(TEX_W, y); ctx.stroke();
    }

    // Dashed stitch borders (top & bottom)
    ctx.strokeStyle = 'rgba(31,18,11,0.22)';
    ctx.lineWidth   = 3.5;
    ctx.setLineDash([9, 7]);
    ctx.beginPath();
    ctx.moveTo(28, 42);        ctx.lineTo(TEX_W - 28, 42);
    ctx.moveTo(28, TEX_H - 42); ctx.lineTo(TEX_W - 28, TEX_H - 42);
    ctx.stroke();
    ctx.setLineDash([]);

    // ── Helper: draw the cafe logo SVG as canvas paths ─────────────────────
    // Source SVG viewBox 0 0 24 24, paths:
    //   M2 19h18v2H2v-2  (saucer bar)
    //   zm2-17h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V2  (cup body)
    //   zm13 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V4   (handle / steam hole)
    //   zm-6 0c1.5 0 2.5 1 2.5 2.5S12.5 9 11 9s-2.5-1-2.5-2.5S9.5 4 11 4z  (leaf dot)
    function drawLogoAt(ox: number, oy: number, scale: number, color: string) {
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);
      ctx.fillStyle = color;

      // Saucer bar: M2 19h18v2H2v-2
      ctx.beginPath();
      ctx.moveTo(2, 19); ctx.lineTo(20, 19); ctx.lineTo(20, 21);
      ctx.lineTo(2, 21); ctx.closePath();
      ctx.fill();

      // Cup body: m2-17h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V2
      ctx.beginPath();
      ctx.moveTo(4, 2);
      ctx.lineTo(17, 2);
      ctx.lineTo(17, 10);
      ctx.arcTo(17, 14, 13, 14, 4);
      ctx.lineTo(8, 14);
      ctx.arcTo(4, 14, 4, 10, 4);
      ctx.closePath();
      ctx.fill();

      // Handle / steam vent: m13 2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2V4
      ctx.beginPath();
      ctx.moveTo(17, 4);
      ctx.lineTo(19, 4);
      ctx.arcTo(21, 4, 21, 6, 2);
      ctx.arcTo(21, 8, 19, 8, 2);
      ctx.lineTo(17, 8);
      ctx.closePath();
      ctx.fill();

      // Leaf bloom (circle): m-6 0c1.5 0 2.5 1 2.5 2.5S12.5 9 11 9s-2.5-1-2.5-2.5S9.5 4 11 4z
      ctx.beginPath();
      ctx.arc(10.5, 6.5, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = sleeveColor; // hollow punch-out
      ctx.fill();

      ctx.restore();
    }

    // ── Draw logo centred at the texture's midpoint (u = 0.5)  ─────────────
    // We'll draw THREE times across the wrap so the logo is always visible
    // regardless of which third is currently forward-facing.
    const logoScale = 24;         // 24-unit SVG → 576px wide icon
    const svgW      = 24 * logoScale;
    const svgH      = 24 * logoScale;

    const positions = [TEX_W / 2 - svgW / 2, TEX_W - svgW / 2, -svgW / 2];

    positions.forEach(px => {
      const py  = TEX_H / 2 - svgH / 2 - 24;
      const bx  = px + svgW / 2;        // badge centre x
      const by  = TEX_H / 2 - 20;       // badge centre y

      // ── Cream circular badge ─────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(bx, by, 230, 0, Math.PI * 2);
      ctx.fillStyle = '#FDFBF7';
      ctx.fill();
      ctx.lineWidth    = 8;
      ctx.strokeStyle  = '#C88342';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx, by, 212, 0, Math.PI * 2);
      ctx.lineWidth   = 2.5;
      ctx.strokeStyle = '#23140E';
      ctx.stroke();

      // ── Vector logo icon ────────────────────────────────────────────────
      drawLogoAt(px, py, logoScale, '#173824');

      // ── Text: BEAN & BLOOM ──────────────────────────────────────────────
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle    = '#1F120B';
      ctx.font         = '900 60px "Poppins", Arial Black, sans-serif';
      ctx.fillText('BEAN & BLOOM', bx, by + 155);

      // ── Subtitle ─────────────────────────────────────────────────────────
      ctx.fillStyle = '#C88342';
      ctx.font      = '700 25px "Poppins", Arial, sans-serif';
      ctx.fillText('ARTISAN COFFEE ROASTERS', bx, by + 193);

      // ── Bottom tag ───────────────────────────────────────────────────────
      ctx.fillStyle = '#5A3822';
      ctx.font      = '600 20px "Poppins", Arial, sans-serif';
      ctx.fillText('ZAMALEK • CAIRO • EST. 2026', bx, by + 225);
    });

    const sleeveTexture     = new THREE.CanvasTexture(sleeveCanvas);
    sleeveTexture.wrapS     = THREE.RepeatWrapping;
    sleeveTexture.wrapT     = THREE.ClampToEdgeWrapping;
    // Shift the texture so u=0.5 (logo centre) lines up with the
    // camera-facing front face. cup rotation.y = -0.32, front face at
    // u = 0.32/(2π) ≈ 0.051 → offset = 0.051 - 0.5 = -0.449
    sleeveTexture.offset.x  = -0.449;

    // ═══════════════════════════════════════════════════════════════════════
    //  CUP GEOMETRY
    // ═══════════════════════════════════════════════════════════════════════
    const cupGeometry = new THREE.CylinderGeometry(1.68, 1.2, 4.4, 64, 1, false);
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cupColor), roughness: 0.38, metalness: 0.05,
    });
    cupGroup.add(new THREE.Mesh(cupGeometry, cupMaterial));

    // Kraft Sleeve
    const sleeveGeometry = new THREE.CylinderGeometry(1.5, 1.34, 2.1, 64, 1, false);
    const sleeveMaterial = new THREE.MeshStandardMaterial({
      map: sleeveTexture, roughness: 0.8, metalness: 0.02,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    sleeveMesh.position.y = -0.15;
    cupGroup.add(sleeveMesh);

    // Bottom rim
    const bottomRimGeometry = new THREE.CylinderGeometry(1.24, 1.2, 0.16, 64);
    const bottomRimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cupColor).multiplyScalar(0.85), roughness: 0.45,
    });
    const bottomRimMesh = new THREE.Mesh(bottomRimGeometry, bottomRimMaterial);
    bottomRimMesh.position.y = -2.2;
    cupGroup.add(bottomRimMesh);

    // Rolled top lip
    const topLipGeometry = new THREE.TorusGeometry(1.69, 0.06, 16, 64);
    topLipGeometry.rotateX(Math.PI / 2);
    const topLipMesh = new THREE.Mesh(topLipGeometry, new THREE.MeshStandardMaterial({
      color: new THREE.Color(cupColor), roughness: 0.3,
    }));
    topLipMesh.position.y = 2.2;
    cupGroup.add(topLipMesh);

    // Moulded lid
    const lidGroup = new THREE.Group();
    lidGroup.position.y = 2.27;
    const lidMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(lidColor), roughness: 0.28, metalness: 0.1,
    });
    const lidBase  = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.73, 0.35, 64), lidMaterial);
    const lidCrown = new THREE.Mesh(new THREE.CylinderGeometry(1.62, 1.66, 0.26, 64), lidMaterial);
    lidCrown.position.y = 0.22;
    const spout    = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.18, 0.32), lidMaterial);
    spout.position.set(0, 0.36, 1.28);
    spout.rotation.x = 0.2;
    lidGroup.add(lidBase, lidCrown, spout);
    cupGroup.add(lidGroup);

    // ── Ground shadow ──────────────────────────────────────────────────────
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width  = 512;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad  = sCtx.createRadialGradient(256, 128, 10, 256, 128, 120);
    grad.addColorStop(0,   'rgba(10,5,2,0.55)');
    grad.addColorStop(0.5, 'rgba(10,5,2,0.25)');
    grad.addColorStop(1,   'rgba(0,0,0,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 512, 256);
    const shadowTexture  = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.85 });
    const groundShadow   = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 2.6), shadowMaterial);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.set(0.4, -2.4, 0.3);
    scene.add(groundShadow);

    // ── Leaning pose (locked, no auto-spin) ───────────────────────────────
    const targetScale = sizeScales[size];
    cupGroup.scale.set(targetScale, targetScale, targetScale);
    cupGroup.rotation.set(0.18, -0.32, -0.16);

    // ═══════════════════════════════════════════════════════════════════════
    //  COFFEE BEANS  –  physics: fall → hit → bounce → settle
    // ═══════════════════════════════════════════════════════════════════════
    const beanBaseGeo = new THREE.SphereGeometry(0.24, 24, 24);
    beanBaseGeo.scale(1.35, 0.9, 0.72);

    interface Bean {
      mesh: THREE.Mesh;
      p0: THREE.Vector3; pHit: THREE.Vector3; pSettle: THREE.Vector3;
      scatterDir: THREE.Vector3;
      delay: number; hitTime: number; settleTime: number;
      rotAxis: THREE.Vector3; rotSpeed: number;
    }

    const makeMat = () => new THREE.MeshStandardMaterial({
      color: 0x361e11, roughness: 0.45, metalness: 0.18, transparent: true, opacity: 1,
    });

    const beans: Bean[] = [
      { mesh: new THREE.Mesh(beanBaseGeo, makeMat()), p0: new THREE.Vector3(4.2, 7.5, 2.5),   pHit: new THREE.Vector3(0.3, 2.35, 1.2),   pSettle: new THREE.Vector3(1.8, -2.1, 1.4),   scatterDir: new THREE.Vector3(14, 6, 8),   delay: 0.05, hitTime: 0.48, settleTime: 1.05, rotAxis: new THREE.Vector3(0.8,  0.4,  0.2).normalize(), rotSpeed: 0.12 },
      { mesh: new THREE.Mesh(beanBaseGeo, makeMat()), p0: new THREE.Vector3(-4.5, 6.8, 2.0),  pHit: new THREE.Vector3(-0.6, 0.2, 1.5),   pSettle: new THREE.Vector3(-1.9, -2.2, 1.3), scatterDir: new THREE.Vector3(-15, 8, 6),  delay: 0.12, hitTime: 0.54, settleTime: 1.15, rotAxis: new THREE.Vector3(-0.5, 0.8, -0.3).normalize(), rotSpeed: 0.11 },
      { mesh: new THREE.Mesh(beanBaseGeo, makeMat()), p0: new THREE.Vector3(1.8, 8.0, 1.0),   pHit: new THREE.Vector3(0.05, 2.45, 1.3),  pSettle: new THREE.Vector3(0.4, 1.95, 1.4),  scatterDir: new THREE.Vector3(4, 16, 10),  delay: 0.2,  hitTime: 0.62, settleTime: 1.12, rotAxis: new THREE.Vector3(0.3, -0.7,  0.6).normalize(), rotSpeed: 0.13 },
      { mesh: new THREE.Mesh(beanBaseGeo, makeMat()), p0: new THREE.Vector3(3.5, 3.5, 4.0),   pHit: new THREE.Vector3(1.2, -0.8, 1.3),   pSettle: new THREE.Vector3(2.4, -2.3, 1.8),  scatterDir: new THREE.Vector3(16, -6, 12), delay: 0.08, hitTime: 0.44, settleTime: 0.98, rotAxis: new THREE.Vector3(0.6,  0.6,  0.4).normalize(), rotSpeed: 0.1  },
      { mesh: new THREE.Mesh(beanBaseGeo, makeMat()), p0: new THREE.Vector3(-3.2, 6.0, -1.5), pHit: new THREE.Vector3(-1.2, 1.0, -0.5),  pSettle: new THREE.Vector3(-1.6, -1.8, -0.7),scatterDir: new THREE.Vector3(-13, 10, -8),delay: 0.25, hitTime: 0.68, settleTime: 1.25, rotAxis: new THREE.Vector3(-0.4,-0.6,  0.7).normalize(), rotSpeed: 0.09 },
    ];
    beans.forEach(b => { b.mesh.position.copy(b.p0); scene.add(b.mesh); });

    // ── Scroll tracking ───────────────────────────────────────────────────
    let currentScroll = 0, targetScroll = 0;
    const handleScroll = () => {
      targetScroll = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.95)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation loop ────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();
    let cupRecoil = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Buttery scroll smoothing
      currentScroll += (targetScroll - currentScroll) * 0.06;

      beans.forEach(b => {
        if (elapsed <= b.delay) return;
        const t = elapsed - b.delay;
        const pos = new THREE.Vector3();

        if (t < b.hitTime) {
          // Phase 1: ease-in approach
          const p = t / b.hitTime;
          pos.lerpVectors(b.p0, b.pHit, p * p * p);
          b.mesh.rotateOnAxis(b.rotAxis, b.rotSpeed);
        } else if (t < b.settleTime) {
          // Phase 2: deflect & arc to resting place
          const p = (t - b.hitTime) / (b.settleTime - b.hitTime);
          const smooth = p * p * (3 - 2 * p);
          pos.lerpVectors(b.pHit, b.pSettle, smooth);
          pos.y += Math.sin(p * Math.PI) * 0.5;
          if (t - b.hitTime < 0.06) cupRecoil = 0.035;
          b.mesh.rotateOnAxis(b.rotAxis, b.rotSpeed * (1 - p * 0.5));
        } else {
          // Phase 3: gentle breathing micro-float
          pos.copy(b.pSettle);
          pos.y += Math.sin(elapsed * 1.6 + b.pSettle.x * 2) * 0.025;
        }

        // Scroll-driven 3D scatter
        if (currentScroll > 0.001) {
          pos.addScaledVector(b.scatterDir, currentScroll);
          const fade = Math.max(0, 1 - currentScroll * 1.35);
          b.mesh.scale.setScalar(fade);
          (b.mesh.material as THREE.MeshStandardMaterial).opacity = fade;
        } else {
          b.mesh.scale.setScalar(1);
          (b.mesh.material as THREE.MeshStandardMaterial).opacity = 1;
        }

        b.mesh.position.copy(pos);
      });

      // Damped cup impact micro-recoil
      cupRecoil *= 0.9;
      cupGroup.rotation.z  = -0.16 + cupRecoil;
      cupGroup.position.y  = Math.sin(elapsed * 1.5) * 0.035;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      [cupGeometry, cupMaterial, sleeveGeometry, sleeveMaterial, sleeveTexture,
       bottomRimGeometry, bottomRimMaterial, topLipGeometry, lidBase.geometry,
       lidCrown.geometry, spout.geometry, lidMaterial, groundShadow.geometry,
       shadowMaterial, shadowTexture, beanBaseGeo].forEach(d => d.dispose());
      beans.forEach(b => { (b.mesh.material as THREE.Material).dispose(); scene.remove(b.mesh); });
      renderer.dispose();
    };
  }, [cupColor, sleeveColor, lidColor, size]);

  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
