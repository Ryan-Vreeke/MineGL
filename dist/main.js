(()=>{var t={398:t=>{Noise={},Noise.SimplexNoise=function(t){null==t&&(t=Math),this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.p=[];for(var e=0;e<256;e++)this.p[e]=Math.floor(256*t.random());for(this.perm=[],e=0;e<512;e++)this.perm[e]=this.p[255&e];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]},Noise.SimplexNoise.prototype.dot=function(t,e,i){return t[0]*e+t[1]*i},Noise.SimplexNoise.prototype.dot3=function(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s},Noise.SimplexNoise.prototype.noise=function(t,e){var i,s,r=(t+e)*(.5*(Math.sqrt(3)-1)),a=Math.floor(t+r),n=Math.floor(e+r),o=(3-Math.sqrt(3))/6,h=(a+n)*o,c=t-(a-h),u=e-(n-h);c>u?(i=1,s=0):(i=0,s=1);var d=c-i+o,l=u-s+o,p=c-1+2*o,f=u-1+2*o,m=255&a,v=255&n,g=this.perm[m+this.perm[v]]%12,y=this.perm[m+i+this.perm[v+s]]%12,b=this.perm[m+1+this.perm[v+1]]%12,w=.5-c*c-u*u,x=.5-d*d-l*l,M=.5-p*p-f*f;return 70*((w<0?0:(w*=w)*w*this.dot(this.grad3[g],c,u))+(x<0?0:(x*=x)*x*this.dot(this.grad3[y],d,l))+(M<0?0:(M*=M)*M*this.dot(this.grad3[b],p,f)))},Noise.SimplexNoise.prototype.noise3d=function(t,e,i){var s,r,a,n,o,h,c=(t+e+i)*(1/3),u=Math.floor(t+c),d=Math.floor(e+c),l=Math.floor(i+c),p=1/6,f=(u+d+l)*p,m=t-(u-f),v=e-(d-f),g=i-(l-f);m>=v?v>=g?(s=1,r=0,a=0,n=1,o=1,h=0):m>=g?(s=1,r=0,a=0,n=1,o=0,h=1):(s=0,r=0,a=1,n=1,o=0,h=1):v<g?(s=0,r=0,a=1,n=0,o=1,h=1):m<g?(s=0,r=1,a=0,n=0,o=1,h=1):(s=0,r=1,a=0,n=1,o=1,h=0);var y=m-s+p,b=v-r+p,w=g-a+p,x=m-n+2*p,M=v-o+2*p,S=g-h+2*p,k=m-1+.5,A=v-1+.5,B=g-1+.5,P=255&u,T=255&d,z=255&l,_=this.perm[P+this.perm[T+this.perm[z]]]%12,U=this.perm[P+s+this.perm[T+r+this.perm[z+a]]]%12,C=this.perm[P+n+this.perm[T+o+this.perm[z+h]]]%12,G=this.perm[P+1+this.perm[T+1+this.perm[z+1]]]%12,E=.6-m*m-v*v-g*g,N=.6-y*y-b*b-w*w,D=.6-x*x-M*M-S*S,O=.6-k*k-A*A-B*B;return 32*((E<0?0:(E*=E)*E*this.dot3(this.grad3[_],m,v,g))+(N<0?0:(N*=N)*N*this.dot3(this.grad3[U],y,b,w))+(D<0?0:(D*=D)*D*this.dot3(this.grad3[C],x,M,S))+(O<0?0:(O*=O)*O*this.dot3(this.grad3[G],k,A,B)))},t.exports=Noise}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}(()=>{"use strict";const t="struct TransformationData {\n  view: mat4x4<f32>,\n  projection: mat4x4<f32>\n};\n\nstruct ObjectData {\n  model: array<mat4x4<f32>>,\n};\n\nstruct Fragment {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) TexCoord: vec2<f32>\n};\n\n@binding(0) @group(0) var<uniform> transformUBO : TransformationData;\n@binding(1) @group(0) var<storage, read> objects: ObjectData;\n@binding(2) @group(0) var myTexture: texture_2d<f32>;\n@binding(3) @group(0) var mySampler: sampler;\n\n@vertex\nfn vs_main(@builtin(instance_index) ID: u32, @location(0) vertexPostion: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {\n\n    var output: Fragment;\n    output.Position = transformUBO.projection * transformUBO.view * objects.model[ID] * vec4<f32>(vertexPostion, 1.0);\n    output.TexCoord = vertexTexCoord;\n\n    return output;\n}\n\n@fragment\nfn fs_main(@location(0) TexCoord: vec2<f32>) -> @location(0) vec4<f32> {\n  return textureSample(myTexture, mySampler, TexCoord);\n}\n";class e{constructor(t){const e=new Float32Array([.5,.5,0,0,1,-.5,.5,0,1,1,-.5,-.5,0,1,0,-.5,-.5,0,1,0,.5,-.5,0,0,0,.5,.5,0,0,1]),i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,s={size:e.byteLength,usage:i,mappedAtCreation:!0};this.buffer=t.createBuffer(s),new Float32Array(this.buffer.getMappedRange()).set(e),this.buffer.unmap(),this.bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12}]}}}var s=1e-6,r="undefined"!=typeof Float32Array?Float32Array:Array;function a(){var t=new r(16);return r!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var n=function(t,e,i,s){return new(i||(i=Promise))((function(r,a){function n(t){try{h(s.next(t))}catch(t){a(t)}}function o(t){try{h(s.throw(t))}catch(t){a(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(n,o)}h((s=s.apply(t,e||[])).next())}))};class o{initialize(t,e){return n(this,void 0,void 0,(function*(){const i=yield fetch(e),s=yield i.blob(),r=yield createImageBitmap(s);yield this.loadImageBitmap(t,r),this.view=this.texture.createView({format:"rgba8unorm",dimension:"2d",aspect:"all",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),this.sampler=t.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"nearest",minFilter:"linear",mipmapFilter:"nearest",maxAnisotropy:1})}))}loadImageBitmap(t,e){return n(this,void 0,void 0,(function*(){const i={size:{width:e.width,height:e.height},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.texture=t.createTexture(i),t.queue.copyExternalImageToTexture({source:e},{texture:this.texture},i.size)}))}}var h=function(t,e,i,s){return new(i||(i=Promise))((function(r,a){function n(t){try{h(s.next(t))}catch(t){a(t)}}function o(t){try{h(s.throw(t))}catch(t){a(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(n,o)}h((s=s.apply(t,e||[])).next())}))};class c{constructor(t,e){this.canvas=t,this.objCount=e}Initialize(){return h(this,void 0,void 0,(function*(){yield this.setupDevice(),yield this.createAssets(),yield this.makeDepthBufferResources(),yield this.makePipeline()}))}setupDevice(){return h(this,void 0,void 0,(function*(){this.adapter=yield navigator.gpu.requestAdapter(),this.device=yield this.adapter.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})}))}makeDepthBufferResources(){return h(this,void 0,void 0,(function*(){this.depthStencilState={format:"depth24plus-stencil8",depthWriteEnabled:!0,depthCompare:"less-equal"};const t={size:{width:this.canvas.width,height:this.canvas.height,depthOrArrayLayers:1},format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT};this.depthStencilBuffer=this.device.createTexture(t),this.depthStencilView=this.depthStencilBuffer.createView({format:"depth24plus-stencil8",dimension:"2d",aspect:"all"}),this.depthStencilAttachment={view:this.depthStencilView,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",stencilLoadOp:"clear",stencilStoreOp:"discard"}}))}makePipeline(){return h(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const e=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage",hasDynamicOffset:!1}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.bindGroup=this.device.createBindGroup({layout:e,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:{buffer:this.objectBuffer}},{binding:2,resource:this.material.view},{binding:3,resource:this.material.sampler}]});const i=this.device.createPipelineLayout({bindGroupLayouts:[e]});this.pipeline=this.device.createRenderPipeline({layout:i,depthStencil:this.depthStencilState,vertex:{module:this.device.createShaderModule({code:t}),entryPoint:"vs_main",buffers:[this.faceMesh.bufferLayout]},fragment:{module:this.device.createShaderModule({code:t}),entryPoint:"fs_main",targets:[{format:this.format}]},primitive:{topology:"triangle-list",cullMode:"back"}})}))}createAssets(){return h(this,void 0,void 0,(function*(){this.faceMesh=new e(this.device),this.material=new o,yield this.material.initialize(this.device,"dist/textures/grass_block_side.png");const t={size:64*this.objCount,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST};this.objectBuffer=this.device.createBuffer(t)}))}render(t,e,i){return h(this,void 0,void 0,(function*(){const s=a();var r,n,o,h,c,u,d;r=s,n=Math.PI/4,o=800/600,h=.1,c=1e3,d=1/Math.tan(n/2),r[0]=d/o,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=d,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[11]=-1,r[12]=0,r[13]=0,r[15]=0,null!=c&&c!==1/0?(u=1/(h-c),r[10]=(c+h)*u,r[14]=2*c*h*u):(r[10]=-1,r[14]=-2*h),this.device.queue.writeBuffer(this.objectBuffer,0,t,0,t.length),this.device.queue.writeBuffer(this.uniformBuffer,0,i.get_model()),this.device.queue.writeBuffer(this.uniformBuffer,64,s);const l=this.device.createCommandEncoder(),p={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:[.44,.7,1,1],loadOp:"clear",storeOp:"store"}],depthStencilAttachment:this.depthStencilAttachment},f=l.beginRenderPass(p);f.setPipeline(this.pipeline),f.setVertexBuffer(0,this.faceMesh.buffer),f.setBindGroup(0,this.bindGroup),f.draw(6,e,0,0),f.end(),this.device.queue.submit([l.finish()])}))}}function u(){var t=new r(3);return r!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function d(t,e,i,s){return t[0]=e[0]+i[0]*s,t[1]=e[1]+i[1]*s,t[2]=e[2]+i[2]*s,t}function l(t,e,i){var s=e[0],r=e[1],a=e[2],n=i[0],o=i[1],h=i[2];return t[0]=r*h-a*o,t[1]=a*n-s*h,t[2]=s*o-r*n,t}function p(t){return t*Math.PI/180}u();class f{constructor(t,e,i){this.position=t,this.eulers=[0,i,e],this.forwards=u(),this.up=u(),this.right=u()}update(){this.forwards=[Math.cos(p(this.eulers[2]))*Math.cos(p(this.eulers[1])),Math.sin(p(this.eulers[2]))*Math.cos(p(this.eulers[1])),Math.sin(p(this.eulers[1]))],l(this.right,this.forwards,[0,0,1]),l(this.up,this.right,this.forwards);var t,e,i,r=u();t=r,e=this.position,i=this.forwards,t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],this.model=a(),function(t,e,i,r){var a,n,o,h,c,u,d,l,p,f,m=e[0],v=e[1],g=e[2],y=r[0],b=r[1],w=r[2],x=i[0],M=i[1],S=i[2];Math.abs(m-x)<s&&Math.abs(v-M)<s&&Math.abs(g-S)<s?function(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t):(d=m-x,l=v-M,p=g-S,a=b*(p*=f=1/Math.hypot(d,l,p))-w*(l*=f),n=w*(d*=f)-y*p,o=y*l-b*d,(f=Math.hypot(a,n,o))?(a*=f=1/f,n*=f,o*=f):(a=0,n=0,o=0),h=l*o-p*n,c=p*a-d*o,u=d*n-l*a,(f=Math.hypot(h,c,u))?(h*=f=1/f,c*=f,u*=f):(h=0,c=0,u=0),t[0]=a,t[1]=h,t[2]=d,t[3]=0,t[4]=n,t[5]=c,t[6]=l,t[7]=0,t[8]=o,t[9]=u,t[10]=p,t[11]=0,t[12]=-(a*m+n*v+o*g),t[13]=-(h*m+c*v+u*g),t[14]=-(d*m+l*v+p*g),t[15]=1)}(this.model,this.position,r,this.up)}get_model(){return this.model}}class m{constructor(t,e){this.position=t,this.faces=[];var i=[];i.push(new v([t[0]-.5,t[1],t[2]],[p(-90),p(-90),0])),i.push(new v([t[0]+.5,t[1],t[2]],[p(-90),p(90),0])),i.push(new v([t[0],t[1]-.5,t[2]],[p(90),p(0),p(180)])),i.push(new v([t[0],t[1]+.5,t[2]],[p(-90),p(0),p(0)])),i.push(new v([t[0],t[1],t[2]+.5],[p(0),p(0),p(0)])),i.push(new v([t[0],t[1],t[2]-.5],[p(0),p(180),p(0)]));for(var s=0;s<e.length;s++)e[s]<t[2]&&this.faces.push(i[s]);this.faces.push(i[4])}get_faces(){return this.faces}}class v{constructor(t,e){var i,s,r,n,o,h,c,u,d,l,p,f,m,v,g,y,b,w;this.position=t,this.model=a(),i=this.model,s=this.model,y=(r=this.position)[0],b=r[1],w=r[2],s===i?(i[12]=s[0]*y+s[4]*b+s[8]*w+s[12],i[13]=s[1]*y+s[5]*b+s[9]*w+s[13],i[14]=s[2]*y+s[6]*b+s[10]*w+s[14],i[15]=s[3]*y+s[7]*b+s[11]*w+s[15]):(n=s[0],o=s[1],h=s[2],c=s[3],u=s[4],d=s[5],l=s[6],p=s[7],f=s[8],m=s[9],v=s[10],g=s[11],i[0]=n,i[1]=o,i[2]=h,i[3]=c,i[4]=u,i[5]=d,i[6]=l,i[7]=p,i[8]=f,i[9]=m,i[10]=v,i[11]=g,i[12]=n*y+u*b+f*w+s[12],i[13]=o*y+d*b+m*w+s[13],i[14]=h*y+l*b+v*w+s[14],i[15]=c*y+p*b+g*w+s[15]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),a=e[4],n=e[5],o=e[6],h=e[7],c=e[8],u=e[9],d=e[10],l=e[11];e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=a*r+c*s,t[5]=n*r+u*s,t[6]=o*r+d*s,t[7]=h*r+l*s,t[8]=c*r-a*s,t[9]=u*r-n*s,t[10]=d*r-o*s,t[11]=l*r-h*s}(this.model,this.model,e[0]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),a=e[0],n=e[1],o=e[2],h=e[3],c=e[8],u=e[9],d=e[10],l=e[11];e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*r-c*s,t[1]=n*r-u*s,t[2]=o*r-d*s,t[3]=h*r-l*s,t[8]=a*s+c*r,t[9]=n*s+u*r,t[10]=o*s+d*r,t[11]=h*s+l*r}(this.model,this.model,e[1]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),a=e[0],n=e[1],o=e[2],h=e[3],c=e[4],u=e[5],d=e[6],l=e[7];e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*r+c*s,t[1]=n*r+u*s,t[2]=o*r+d*s,t[3]=h*r+l*s,t[4]=c*r-a*s,t[5]=u*r-n*s,t[6]=d*r-o*s,t[7]=l*r-h*s}(this.model,this.model,e[2])}get_model(){return this.model}}class g{constructor(t,e,i){this.blocks=new Array((i+2)*(i+2)),this.blocks.fill(-100),this.offset=i/2,this.size=i,this.x=t,this.y=e}createChunk(t){for(var e=1;e<=this.size;e++)for(var i=1;i<=this.size;i++){const s=this.x*this.size+e-1,r=this.y*this.size+i-1;this.add(e,i,t(s,r))}}at(t,e){return this.blocks[t*(this.size+2)+e]}add(t,e,i){this.blocks[t*(this.size+2)+e]=i}getNeighbors(t,e){var i=[];return i.push(this.at(t-1,e)),i.push(this.at(t+1,e)),i.push(this.at(t,e-1)),i.push(this.at(t,e+1)),i}getBlocks(){for(var t=[],e=1;e<=this.size;e++)for(var i=1;i<=this.size;i++){const s=this.x*this.size+e-1,r=this.y*this.size+i-1,a=this.at(e,i),n=this.getNeighbors(e,i);let o=new m([s,r,a],n);t.push(o);const h=a-Math.min(...n);for(let e=a;e>h;e--)o=new m([s,r,e],n),t.push(o)}return t}}var y=i(398);class b{constructor(t,e){this.chunkSize=t,this.center=e/2,this.mapSize=e,this.chunks=new Array(e*e),this.blocks=[],this.faces=[],this.simplex=new y.SimplexNoise,this.lacunarity=2,this.persistance=.5}createChunk(t,e){(t>=this.mapSize-1||e>=this.mapSize-1)&&(this.mapSize+=2);let i=new g(t,e,this.chunkSize);i.createChunk(((t,e)=>{var i=this.octave(t,e,0)+this.octave(t,e,1)+this.octave(t,e,2);return Math.floor(50*i)}));const s=t+this.center,r=e+this.center;return this.chunks[s*this.mapSize+r]=i,i.getBlocks().forEach((t=>{this.faces.push(...t.get_faces())})),i}getChunk(t,e){const i=t+this.center,s=e+this.center;return this.chunks[i*this.mapSize+s]}octave(t,e,i){let s=Math.pow(this.lacunarity,i),r=Math.pow(this.persistance,i);return this.simplex.noise(t/150*s,e/150*s)*r}getBlocks(){return this.blocks}getFaces(){return this.faces}getObjectData(){const t=new Float32Array(16*this.mapSize*this.mapSize*this.chunkSize*this.chunkSize*6);var e=0;return this.faces.forEach((i=>{for(var s=i.get_model(),r=0;r<16;r++)t[16*e+r]=s.at(r);e++})),t}}class w{constructor(t,e){this.chunkCount=t,this.chunkSize=e;const i=e*e*(t*t)*6;this.player=new f([-20,0,10],0,0),this.mapGen=new b(e,t);const s=Math.floor(t/2);for(var r=-s;r<=s;r++)for(var a=-s;a<=s;a++)this.mapGen.createChunk(r,a);this.object_data=this.mapGen.getObjectData(),this.object_count=i}update(){this.player.update()}get_blocks(){return this.object_data}get_player(){return this.player}player_move(t,e){d(this.player.position,this.player.position,this.player.forwards,e),d(this.player.position,this.player.position,this.player.right,t)}player_look(t,e){this.player.eulers[2]-=t,this.player.eulers[2]%=360,this.player.eulers[1]=Math.min(89,Math.max(-89,this.player.eulers[1]+e))}}const x=document.querySelector("canvas"),M=new class{constructor(t){this.run=()=>{this.scene.update(),this.scene.player_move(this.sideAmount*this.scale,this.forwardAmount*this.scale),this.renderer.render(this.scene.get_blocks(),this.scene.object_count,this.scene.get_player()),requestAnimationFrame(this.run)},this.canvas=t,this.renderer=new c(t,13824),this.renderer.Initialize(),this.scene=new w(3,16),this.forwardAmount=0,this.sideAmount=0,this.scale=.5,document.addEventListener("keydown",this.keyDown.bind(this)),document.addEventListener("keyup",this.keyUp.bind(this)),this.canvas.onclick=()=>{this.canvas.requestPointerLock()},this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this))}handleMouseMove(t){this.scene.player_look(t.movementX/10,t.movementY/-10)}keyUp(t){this.forwardAmount=0,this.sideAmount=0}keyDown(t){switch(t.key){case"w":this.forwardAmount=1;break;case"a":this.sideAmount=-1;break;case"s":this.forwardAmount=-1;break;case"d":this.sideAmount=1}}}(x);M.run()})()})();