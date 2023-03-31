AFRAME.registerComponent("clipping", {
  // A new instance of the component gets created for each <a-entity> the component is attached to
  // The given instance of the component can be accessed using the `this` variable
  // - this.name refers to the string representation of the component name

  init: function () {
    
    //  Enable clipping
    this.el.sceneEl.renderer.localClippingEnabled = true
    

    this.throttledDebug = AFRAME.utils.throttle(this.debug, 1000, this);
    console.log(this.el.object3D.children[0].material)
    
    this.planes=[];
    this.planes[0]=new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
    
    console.log(this.planes)
    
    this.rig=this.el.sceneEl.querySelector("#rig");
    
    this.el.getObject3D("mesh").material.clippingPlanes=this.planes;
    this.el.addEventListener('child-attached',  function (event){console.log("child-attached")})
  },

  tick: function (t, dt) {
    
  let A = new THREE.Vector3;
  let B= new THREE.Vector3;
  let C = new THREE.Vector3;
  
  this.rig.object3D.getWorldPosition(A);
  A.y=0;
  B.set(0,0,-5);
  C.addVectors(A, new THREE.Vector3(0,1,0));
  

  this.planes[0].setFromCoplanarPoints(A,B,C);
  this.throttledDebug(this.planes);
  },

  /**
   * This is a debugging function
   * It is NOT executed automatically
   * All it does is console.log each element of the array given to it as input
   * If `what` is not an array just console.log `what`
   * @param {Array<any>} what - what to print to the console log
   * @returns {undefined}
   */
  debug: function (what) {
    if (!Array.isArray(what)) {
      console.log(what);
    } else {
      for (msg of what) {
        console.log(msg);
      }
    }
  },
});
