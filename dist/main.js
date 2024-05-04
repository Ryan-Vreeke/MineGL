(()=>{"use strict";const e="struct TransformationData {\n  view: mat4x4<f32>,\n  projection: mat4x4<f32>\n};\n\nstruct ObjectData {\n  model: array<mat4x4<f32>>,\n};\n\nstruct Fragment {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) TexCoord: vec2<f32>\n};\n\n@binding(0) @group(0) var<uniform> transformUBO : TransformationData;\n@binding(1) @group(0) var<storage, read> objects: ObjectData;\n@binding(2) @group(0) var myTexture: texture_2d<f32>;\n@binding(3) @group(0) var mySampler: sampler;\n\n@vertex\nfn vs_main(@builtin(instance_index) ID: u32, @location(0) vertexPostion: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {\n\n    var output: Fragment;\n    output.Position = transformUBO.projection * transformUBO.view * objects.model[ID] * vec4<f32>(vertexPostion, 1.0);\n    output.TexCoord = vertexTexCoord;\n\n    return output;\n}\n\n@fragment\nfn fs_main(@location(0) TexCoord: vec2<f32>) -> @location(0) vec4<f32> {\n  return textureSample(myTexture, mySampler, TexCoord);\n}\n";class t{constructor(e){const t=new Float32Array([.5,-.5,.5,1,0,-.5,-.5,.5,0,0,-.5,-.5,-.5,0,1,.5,-.5,-.5,1,1,.5,-.5,.5,1,0,-.5,-.5,-.5,0,1,.5,.5,.5,1,0,.5,-.5,.5,0,0,.5,-.5,-.5,0,1,.5,.5,-.5,1,1,.5,.5,.5,1,0,.5,-.5,-.5,0,1,-.5,.5,.5,1,0,.5,.5,.5,0,0,.5,.5,-.5,0,1,-.5,.5,-.5,1,1,-.5,.5,.5,1,0,.5,.5,-.5,0,1,-.5,-.5,.5,1,0,-.5,.5,.5,0,0,-.5,.5,-.5,0,1,-.5,-.5,-.5,1,1,-.5,-.5,.5,1,0,-.5,.5,-.5,0,1,.5,.5,.5,0,0,-.5,.5,.5,0,0,-.5,-.5,.5,0,0,-.5,-.5,.5,0,0,.5,-.5,.5,0,0,.5,.5,.5,0,0,.5,-.5,-.5,0,0,-.5,-.5,-.5,0,0,-.5,.5,-.5,0,0,.5,.5,-.5,0,0,.5,-.5,-.5,0,0,-.5,.5,-.5,0,0]),i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,s={size:t.byteLength,usage:i,mappedAtCreation:!0};this.buffer=e.createBuffer(s),new Float32Array(this.buffer.getMappedRange()).set(t),this.buffer.unmap(),this.bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12}]}}}var i=1e-6,s="undefined"!=typeof Float32Array?Float32Array:Array;function r(){var e=new s(16);return s!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function n(e,t,i){var s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],h=t[5],u=t[6],c=t[7],d=t[8],l=t[9],f=t[10],p=t[11],m=t[12],v=t[13],y=t[14],g=t[15],b=i[0],w=i[1],x=i[2],k=i[3];return e[0]=b*s+w*o+x*d+k*m,e[1]=b*r+w*h+x*l+k*v,e[2]=b*n+w*u+x*f+k*y,e[3]=b*a+w*c+x*p+k*g,b=i[4],w=i[5],x=i[6],k=i[7],e[4]=b*s+w*o+x*d+k*m,e[5]=b*r+w*h+x*l+k*v,e[6]=b*n+w*u+x*f+k*y,e[7]=b*a+w*c+x*p+k*g,b=i[8],w=i[9],x=i[10],k=i[11],e[8]=b*s+w*o+x*d+k*m,e[9]=b*r+w*h+x*l+k*v,e[10]=b*n+w*u+x*f+k*y,e[11]=b*a+w*c+x*p+k*g,b=i[12],w=i[13],x=i[14],k=i[15],e[12]=b*s+w*o+x*d+k*m,e[13]=b*r+w*h+x*l+k*v,e[14]=b*n+w*u+x*f+k*y,e[15]=b*a+w*c+x*p+k*g,e}function a(e,t,i){var s,r,n,a,o,h,u,c,d,l,f,p,m=i[0],v=i[1],y=i[2];return t===e?(e[12]=t[0]*m+t[4]*v+t[8]*y+t[12],e[13]=t[1]*m+t[5]*v+t[9]*y+t[13],e[14]=t[2]*m+t[6]*v+t[10]*y+t[14],e[15]=t[3]*m+t[7]*v+t[11]*y+t[15]):(s=t[0],r=t[1],n=t[2],a=t[3],o=t[4],h=t[5],u=t[6],c=t[7],d=t[8],l=t[9],f=t[10],p=t[11],e[0]=s,e[1]=r,e[2]=n,e[3]=a,e[4]=o,e[5]=h,e[6]=u,e[7]=c,e[8]=d,e[9]=l,e[10]=f,e[11]=p,e[12]=s*m+o*v+d*y+t[12],e[13]=r*m+h*v+l*y+t[13],e[14]=n*m+u*v+f*y+t[14],e[15]=a*m+c*v+p*y+t[15]),e}function o(e,t,i){var s=i[0],r=i[1],n=i[2];return e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s,e[3]=t[3]*s,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function h(e,t,i){var s=Math.sin(i),r=Math.cos(i),n=t[0],a=t[1],o=t[2],h=t[3],u=t[4],c=t[5],d=t[6],l=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*r+u*s,e[1]=a*r+c*s,e[2]=o*r+d*s,e[3]=h*r+l*s,e[4]=u*r-n*s,e[5]=c*r-a*s,e[6]=d*r-o*s,e[7]=l*r-h*s,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var u=function(e,t,i,s){return new(i||(i=Promise))((function(r,n){function a(e){try{h(s.next(e))}catch(e){n(e)}}function o(e){try{h(s.throw(e))}catch(e){n(e)}}function h(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,o)}h((s=s.apply(e,t||[])).next())}))};class c{initialize(e,t){return u(this,void 0,void 0,(function*(){const i=yield fetch(t),s=yield i.blob(),r=yield createImageBitmap(s);yield this.loadImageBitmap(e,r),this.view=this.texture.createView({format:"rgba8unorm",dimension:"2d",aspect:"all",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),this.sampler=e.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"nearest",minFilter:"linear",mipmapFilter:"nearest",maxAnisotropy:1})}))}loadImageBitmap(e,t){return u(this,void 0,void 0,(function*(){const i={size:{width:t.width,height:t.height},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.texture=e.createTexture(i),e.queue.copyExternalImageToTexture({source:t},{texture:this.texture},i.size)}))}}var d=function(e,t,i,s){return new(i||(i=Promise))((function(r,n){function a(e){try{h(s.next(e))}catch(e){n(e)}}function o(e){try{h(s.throw(e))}catch(e){n(e)}}function h(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,o)}h((s=s.apply(e,t||[])).next())}))};class l{constructor(e,t){this.canvas=e,this.objCount=t}Initialize(){return d(this,void 0,void 0,(function*(){yield this.setupDevice(),yield this.createAssets(),yield this.makeDepthBufferResources(),yield this.makePipeline()}))}setupDevice(){return d(this,void 0,void 0,(function*(){this.adapter=yield navigator.gpu.requestAdapter(),this.device=yield this.adapter.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})}))}makeDepthBufferResources(){return d(this,void 0,void 0,(function*(){this.depthStencilState={format:"depth24plus-stencil8",depthWriteEnabled:!0,depthCompare:"less-equal"};const e={size:{width:this.canvas.width,height:this.canvas.height,depthOrArrayLayers:1},format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT};this.depthStencilBuffer=this.device.createTexture(e),this.depthStencilView=this.depthStencilBuffer.createView({format:"depth24plus-stencil8",dimension:"2d",aspect:"all"}),this.depthStencilAttachment={view:this.depthStencilView,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",stencilLoadOp:"clear",stencilStoreOp:"discard"}}))}makePipeline(){return d(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const t=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage",hasDynamicOffset:!1}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.bindGroup=this.device.createBindGroup({layout:t,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:{buffer:this.objectBuffer}},{binding:2,resource:this.material.view},{binding:3,resource:this.material.sampler}]});const i=this.device.createPipelineLayout({bindGroupLayouts:[t]});this.pipeline=this.device.createRenderPipeline({layout:i,depthStencil:this.depthStencilState,vertex:{module:this.device.createShaderModule({code:e}),entryPoint:"vs_main",buffers:[this.squareMesh.bufferLayout]},fragment:{module:this.device.createShaderModule({code:e}),entryPoint:"fs_main",targets:[{format:this.format}]},primitive:{topology:"triangle-list",cullMode:"back"}})}))}createAssets(){return d(this,void 0,void 0,(function*(){this.squareMesh=new t(this.device),this.material=new c,yield this.material.initialize(this.device,"dist/textures/grass_block_side.png");const e={size:64*this.objCount,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST};this.objectBuffer=this.device.createBuffer(e)}))}render(e,t,i){return d(this,void 0,void 0,(function*(){const s=r();var n,a,o,h,u,c,d;n=s,a=Math.PI/4,o=800/600,h=.1,u=100,d=1/Math.tan(a/2),n[0]=d/o,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=d,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,null!=u&&u!==1/0?(c=1/(h-u),n[10]=(u+h)*c,n[14]=2*u*h*c):(n[10]=-1,n[14]=-2*h),this.device.queue.writeBuffer(this.objectBuffer,0,e,0,e.length),this.device.queue.writeBuffer(this.uniformBuffer,0,i.get_model()),this.device.queue.writeBuffer(this.uniformBuffer,64,s);const l=this.device.createCommandEncoder(),f={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:[.44,.7,1,1],loadOp:"clear",storeOp:"store"}],depthStencilAttachment:this.depthStencilAttachment},p=l.beginRenderPass(f);p.setPipeline(this.pipeline),p.setVertexBuffer(0,this.squareMesh.buffer),p.setBindGroup(0,this.bindGroup),p.draw(36,t,0,0),p.end(),this.device.queue.submit([l.finish()])}))}}function f(){var e=new s(3);return s!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function p(e,t,i,s){return e[0]=t[0]+i[0]*s,e[1]=t[1]+i[1]*s,e[2]=t[2]+i[2]*s,e}function m(e,t,i){var s=t[0],r=t[1],n=t[2],a=i[0],o=i[1],h=i[2];return e[0]=r*h-n*o,e[1]=n*a-s*h,e[2]=s*o-r*a,e}function v(e){return e*Math.PI/180}f();class y{constructor(e,t,i){this.position=e,this.eulers=[0,i,t],this.forwards=f(),this.up=f(),this.right=f()}update(){this.forwards=[Math.cos(v(this.eulers[2]))*Math.cos(v(this.eulers[1])),Math.sin(v(this.eulers[2]))*Math.cos(v(this.eulers[1])),Math.sin(v(this.eulers[1]))],m(this.right,this.forwards,[0,0,1]),m(this.up,this.right,this.forwards);var e,t,s,n=f();e=n,t=this.position,s=this.forwards,e[0]=t[0]+s[0],e[1]=t[1]+s[1],e[2]=t[2]+s[2],this.model=r(),function(e,t,s,r){var n,a,o,h,u,c,d,l,f,p,m=t[0],v=t[1],y=t[2],g=r[0],b=r[1],w=r[2],x=s[0],k=s[1],M=s[2];Math.abs(m-x)<i&&Math.abs(v-k)<i&&Math.abs(y-M)<i?function(e){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(e):(d=m-x,l=v-k,f=y-M,n=b*(f*=p=1/Math.hypot(d,l,f))-w*(l*=p),a=w*(d*=p)-g*f,o=g*l-b*d,(p=Math.hypot(n,a,o))?(n*=p=1/p,a*=p,o*=p):(n=0,a=0,o=0),h=l*o-f*a,u=f*n-d*o,c=d*a-l*n,(p=Math.hypot(h,u,c))?(h*=p=1/p,u*=p,c*=p):(h=0,u=0,c=0),e[0]=n,e[1]=h,e[2]=d,e[3]=0,e[4]=a,e[5]=u,e[6]=l,e[7]=0,e[8]=o,e[9]=c,e[10]=f,e[11]=0,e[12]=-(n*m+a*v+o*y),e[13]=-(h*m+u*v+c*y),e[14]=-(d*m+l*v+f*y),e[15]=1)}(this.model,this.position,n,this.up)}get_model(){return this.model}}class g{constructor(e,t){this.position=e,this.eulers=f(),this.eulers[2]=t,this.model=r(),a(this.model,this.model,this.position),h(this.model,this.model,0);let i=r();o(i,i,[.8,.8,.8]),n(this.model,this.model,i)}update(){this.eulers[2]+=1,this.eulers[2]%=360,this.model=r(),a(this.model,this.model,this.position),h(this.model,this.model,v(this.eulers[2]));let e=r();o(e,e,[.8,.8,.8]),n(this.model,this.model,e)}get_model(){return this.model}}class b{constructor(e,t,i){this.blocks=[],this.object_data=new Float32Array(16*i*i),this.x=e,this.size=i,this.y=t}createChunk(e){for(var t=0,i=0;i<this.size;i++){this.blocks[i]=[];for(var s=0;s<this.size;s++){this.blocks[i][s]=[];let n=this.x*this.size+i,a=this.y*this.size+s,o=e(n,a);var r=new g([n,a,o],0);this.createEntry(i,s,o,t,r),t++}}}createEntry(e,t,i,s,r){this.blocks[e][t][i]=r;for(var n=this.blocks[e][t][i].get_model(),a=0;a<16;a++)this.object_data[16*s+a]=n.at(a)}}class w{constructor(e){this.chunkSize=e,this.chunks=[];for(let e=0;e<10;e++)this.chunks.push([])}createChunk(e,t){let i=new b(e,t,this.chunkSize);i.createChunk(((e,t)=>0)),this.chunks[e][t]=i}update(){let e=new Float32Array(16*this.chunkSize*this.chunkSize*4),t=0;for(var i=0;i<this.chunks.length;i++)for(var s=0;s<this.chunks[i].length;s++)this.chunks[i][s].object_data.forEach((i=>{e[t]=i,t++}));return e}getBlocks(){let e;e=[];for(let t=0;t<16;t++)for(let i=0;i<16;i++)e.push(this.chunks[0][0].blocks[t][i][0]);return e}}class x{constructor(e,t){this.chunkCount=e,this.chunkSize=t,this.player=new y([-20,0,5],0,0),this.mapGen=new w(t),this.mapGen.createChunk(1,0),this.object_data=this.mapGen.update(),this.object_count=t*t}update(){this.player.update()}get_blocks(){return this.object_data}get_player(){return this.player}player_move(e,t){p(this.player.position,this.player.position,this.player.forwards,t),p(this.player.position,this.player.position,this.player.right,e)}player_look(e,t){this.player.eulers[2]-=e,this.player.eulers[2]%=360,this.player.eulers[1]=Math.min(89,Math.max(-89,this.player.eulers[1]+t))}}const k=document.querySelector("canvas"),M=new class{constructor(e){this.run=()=>{this.scene.update(),this.scene.player_move(this.sideAmount*this.scale,this.forwardAmount*this.scale),this.renderer.render(this.scene.get_blocks(),this.scene.object_count,this.scene.get_player()),requestAnimationFrame(this.run)},this.canvas=e,this.renderer=new l(e,4096),this.renderer.Initialize(),this.scene=new x(4,16),this.forwardAmount=0,this.sideAmount=0,this.scale=.5,document.addEventListener("keydown",this.keyDown.bind(this)),document.addEventListener("keyup",this.keyUp.bind(this)),this.canvas.onclick=()=>{this.canvas.requestPointerLock()},this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this))}handleMouseMove(e){this.scene.player_look(e.movementX/10,e.movementY/-10)}keyUp(e){this.forwardAmount=0,this.sideAmount=0}keyDown(e){switch(e.key){case"w":this.forwardAmount=1;break;case"a":this.sideAmount=-1;break;case"s":this.forwardAmount=-1;break;case"d":this.sideAmount=1}}}(k);M.run()})();