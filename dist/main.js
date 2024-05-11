(()=>{var t={398:t=>{Noise={},Noise.SimplexNoise=function(t){null==t&&(t=Math),this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.p=[];for(var e=0;e<256;e++)this.p[e]=Math.floor(256*t.random());for(this.perm=[],e=0;e<512;e++)this.perm[e]=this.p[255&e];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]},Noise.SimplexNoise.prototype.dot=function(t,e,i){return t[0]*e+t[1]*i},Noise.SimplexNoise.prototype.dot3=function(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s},Noise.SimplexNoise.prototype.noise=function(t,e){var i,s,r=(t+e)*(.5*(Math.sqrt(3)-1)),n=Math.floor(t+r),o=Math.floor(e+r),a=(3-Math.sqrt(3))/6,h=(n+o)*a,u=t-(n-h),c=e-(o-h);u>c?(i=1,s=0):(i=0,s=1);var l=u-i+a,d=c-s+a,p=u-1+2*a,f=c-1+2*a,m=255&n,v=255&o,g=this.perm[m+this.perm[v]]%12,y=this.perm[m+i+this.perm[v+s]]%12,b=this.perm[m+1+this.perm[v+1]]%12,x=.5-u*u-c*c,w=.5-l*l-d*d,M=.5-p*p-f*f;return 70*((x<0?0:(x*=x)*x*this.dot(this.grad3[g],u,c))+(w<0?0:(w*=w)*w*this.dot(this.grad3[y],l,d))+(M<0?0:(M*=M)*M*this.dot(this.grad3[b],p,f)))},Noise.SimplexNoise.prototype.noise3d=function(t,e,i){var s,r,n,o,a,h,u=(t+e+i)*(1/3),c=Math.floor(t+u),l=Math.floor(e+u),d=Math.floor(i+u),p=1/6,f=(c+l+d)*p,m=t-(c-f),v=e-(l-f),g=i-(d-f);m>=v?v>=g?(s=1,r=0,n=0,o=1,a=1,h=0):m>=g?(s=1,r=0,n=0,o=1,a=0,h=1):(s=0,r=0,n=1,o=1,a=0,h=1):v<g?(s=0,r=0,n=1,o=0,a=1,h=1):m<g?(s=0,r=1,n=0,o=0,a=1,h=1):(s=0,r=1,n=0,o=1,a=1,h=0);var y=m-s+p,b=v-r+p,x=g-n+p,w=m-o+2*p,M=v-a+2*p,S=g-h+2*p,k=m-1+.5,T=v-1+.5,B=g-1+.5,P=255&c,A=255&l,U=255&d,_=this.perm[P+this.perm[A+this.perm[U]]]%12,C=this.perm[P+s+this.perm[A+r+this.perm[U+n]]]%12,G=this.perm[P+o+this.perm[A+a+this.perm[U+h]]]%12,D=this.perm[P+1+this.perm[A+1+this.perm[U+1]]]%12,E=.6-m*m-v*v-g*g,z=.6-y*y-b*b-x*x,O=.6-w*w-M*M-S*S,N=.6-k*k-T*T-B*B;return 32*((E<0?0:(E*=E)*E*this.dot3(this.grad3[_],m,v,g))+(z<0?0:(z*=z)*z*this.dot3(this.grad3[C],y,b,x))+(O<0?0:(O*=O)*O*this.dot3(this.grad3[G],w,M,S))+(N<0?0:(N*=N)*N*this.dot3(this.grad3[D],k,T,B)))},t.exports=Noise}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}(()=>{"use strict";const t="struct TransformationData {\n  view: mat4x4<f32>,\n  projection: mat4x4<f32>\n};\n\nstruct ObjectData {\n  model: array<mat4x4<f32>>,\n};\n\nstruct TextureData{\n  texID: array<vec2<f32>>,\n}\n\nstruct Fragment {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) TexCoord: vec2<f32>\n};\n\n@binding(0) @group(0) var<uniform> transformUBO : TransformationData;\n@binding(1) @group(0) var<storage, read> objects: ObjectData;\n@binding(4) @group(0) var<storage, read> textures: TextureData;\n@binding(2) @group(0) var myTexture: texture_2d<f32>;\n@binding(3) @group(0) var mySampler: sampler;\n\n@vertex\nfn vs_main(@builtin(instance_index) ID: u32, @location(0) vertexPostion: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {\n\n    var output: Fragment;\n    output.Position = transformUBO.projection * transformUBO.view * objects.model[ID] * vec4<f32>(vertexPostion, 1.0);\n    output.TexCoord = vertexTexCoord + textures.texID[ID];\n\n    return output;\n}\n\n@fragment\nfn fs_main(@location(0) TexCoord: vec2<f32>) -> @location(0) vec4<f32> {\n    return textureSample(myTexture, mySampler, TexCoord);\n}\n";class e{constructor(t){const e=new Float32Array([.5,.5,0,0,0,-.5,.5,0,1/16,0,-.5,-.5,0,1/16,1/16,-.5,-.5,0,1/16,1/16,.5,-.5,0,0,1/16,.5,.5,0,0,0]),i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,s={size:e.byteLength,usage:i,mappedAtCreation:!0};this.buffer=t.createBuffer(s),new Float32Array(this.buffer.getMappedRange()).set(e),this.buffer.unmap(),this.bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12}]}}}var s=1e-6,r="undefined"!=typeof Float32Array?Float32Array:Array;function n(){var t=new r(16);return r!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var o=function(t,e,i,s){return new(i||(i=Promise))((function(r,n){function o(t){try{h(s.next(t))}catch(t){n(t)}}function a(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))};class a{initialize(t,e){return o(this,void 0,void 0,(function*(){const i=yield fetch(e),s=yield i.blob(),r=yield createImageBitmap(s);yield this.loadImageBitmap(t,r),this.view=this.texture.createView({format:"rgba8unorm",dimension:"2d",aspect:"all",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),this.sampler=t.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"nearest",minFilter:"linear",mipmapFilter:"nearest",maxAnisotropy:1})}))}loadImageBitmap(t,e){return o(this,void 0,void 0,(function*(){const i={size:{width:e.width,height:e.height},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.texture=t.createTexture(i),t.queue.copyExternalImageToTexture({source:e},{texture:this.texture},i.size)}))}}var h=function(t,e,i,s){return new(i||(i=Promise))((function(r,n){function o(t){try{h(s.next(t))}catch(t){n(t)}}function a(t){try{h(s.throw(t))}catch(t){n(t)}}function h(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((s=s.apply(t,e||[])).next())}))};class u{constructor(t,e){this.canvas=t,this.objCount=e}Initialize(){return h(this,void 0,void 0,(function*(){yield this.setupDevice(),yield this.createAssets(),yield this.makeDepthBufferResources(),yield this.makePipeline()}))}setupDevice(){return h(this,void 0,void 0,(function*(){this.adapter=yield navigator.gpu.requestAdapter(),this.device=yield this.adapter.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})}))}makeDepthBufferResources(){return h(this,void 0,void 0,(function*(){this.depthStencilState={format:"depth24plus-stencil8",depthWriteEnabled:!0,depthCompare:"less-equal"};const t={size:{width:this.canvas.width,height:this.canvas.height,depthOrArrayLayers:1},format:"depth24plus-stencil8",usage:GPUTextureUsage.RENDER_ATTACHMENT};this.depthStencilBuffer=this.device.createTexture(t),this.depthStencilView=this.depthStencilBuffer.createView({format:"depth24plus-stencil8",dimension:"2d",aspect:"all"}),this.depthStencilAttachment={view:this.depthStencilView,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store",stencilLoadOp:"clear",stencilStoreOp:"discard"}}))}makePipeline(){return h(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const e=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage",hasDynamicOffset:!1}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:4,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage",hasDynamicOffset:!1}}]});this.bindGroup=this.device.createBindGroup({layout:e,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:{buffer:this.objectBuffer}},{binding:2,resource:this.material.view},{binding:3,resource:this.material.sampler},{binding:4,resource:{buffer:this.textureBuffer}}]});const i=this.device.createPipelineLayout({bindGroupLayouts:[e]});this.pipeline=this.device.createRenderPipeline({layout:i,depthStencil:this.depthStencilState,vertex:{module:this.device.createShaderModule({code:t}),entryPoint:"vs_main",buffers:[this.faceMesh.bufferLayout]},fragment:{module:this.device.createShaderModule({code:t}),entryPoint:"fs_main",targets:[{format:this.format}]},primitive:{topology:"triangle-list",cullMode:"back"}})}))}createAssets(){return h(this,void 0,void 0,(function*(){this.faceMesh=new e(this.device),this.material=new a,yield this.material.initialize(this.device,"dist/textures/terrain.png");const t={size:64*this.objCount,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST},i={size:8*this.objCount,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST};this.objectBuffer=this.device.createBuffer(t),this.textureBuffer=this.device.createBuffer(i)}))}render(t,e,i,s){return h(this,void 0,void 0,(function*(){const r=n();var o,a,h,u,c,l,d;o=r,a=Math.PI/4,h=800/600,u=.1,c=1e3,d=1/Math.tan(a/2),o[0]=d/h,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=d,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[11]=-1,o[12]=0,o[13]=0,o[15]=0,null!=c&&c!==1/0?(l=1/(u-c),o[10]=(c+u)*l,o[14]=2*c*u*l):(o[10]=-1,o[14]=-2*u),this.device.queue.writeBuffer(this.objectBuffer,0,t,0,t.length),this.device.queue.writeBuffer(this.textureBuffer,0,e,0,e.length),this.device.queue.writeBuffer(this.uniformBuffer,0,s.get_model()),this.device.queue.writeBuffer(this.uniformBuffer,64,r);const p=this.device.createCommandEncoder(),f={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:[.44,.7,1,1],loadOp:"clear",storeOp:"store"}],depthStencilAttachment:this.depthStencilAttachment},m=p.beginRenderPass(f);m.setPipeline(this.pipeline),m.setVertexBuffer(0,this.faceMesh.buffer),m.setBindGroup(0,this.bindGroup),m.draw(6,i,0,0),m.end(),this.device.queue.submit([p.finish()])}))}}function c(){var t=new r(3);return r!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function l(t,e,i,s){return t[0]=e[0]+i[0]*s,t[1]=e[1]+i[1]*s,t[2]=e[2]+i[2]*s,t}function d(t,e,i){var s=e[0],r=e[1],n=e[2],o=i[0],a=i[1],h=i[2];return t[0]=r*h-n*a,t[1]=n*o-s*h,t[2]=s*a-r*o,t}function p(t){return t*Math.PI/180}c();class f{constructor(t,e,i){this.position=t,this.eulers=[0,i,e],this.forwards=c(),this.up=c(),this.right=c()}update(){this.forwards=[Math.cos(p(this.eulers[2]))*Math.cos(p(this.eulers[1])),Math.sin(p(this.eulers[2]))*Math.cos(p(this.eulers[1])),Math.sin(p(this.eulers[1]))],d(this.right,this.forwards,[0,0,1]),d(this.up,this.right,this.forwards);var t,e,i,r=c();t=r,e=this.position,i=this.forwards,t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],this.model=n(),function(t,e,i,r){var n,o,a,h,u,c,l,d,p,f,m=e[0],v=e[1],g=e[2],y=r[0],b=r[1],x=r[2],w=i[0],M=i[1],S=i[2];Math.abs(m-w)<s&&Math.abs(v-M)<s&&Math.abs(g-S)<s?function(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t):(l=m-w,d=v-M,p=g-S,n=b*(p*=f=1/Math.hypot(l,d,p))-x*(d*=f),o=x*(l*=f)-y*p,a=y*d-b*l,(f=Math.hypot(n,o,a))?(n*=f=1/f,o*=f,a*=f):(n=0,o=0,a=0),h=d*a-p*o,u=p*n-l*a,c=l*o-d*n,(f=Math.hypot(h,u,c))?(h*=f=1/f,u*=f,c*=f):(h=0,u=0,c=0),t[0]=n,t[1]=h,t[2]=l,t[3]=0,t[4]=o,t[5]=u,t[6]=d,t[7]=0,t[8]=a,t[9]=c,t[10]=p,t[11]=0,t[12]=-(n*m+o*v+a*g),t[13]=-(h*m+u*v+c*g),t[14]=-(l*m+d*v+p*g),t[15]=1)}(this.model,this.position,r,this.up)}get_model(){return this.model}}class m{constructor(t){this.position=t}}class v{constructor(t,e,i){var s,r,o,a,h,u,c,l,d,p,f,m,v,g,y,b,x,w;this.position=t,this.type=i,this.model=n(),s=this.model,r=this.model,b=(o=this.position)[0],x=o[1],w=o[2],r===s?(s[12]=r[0]*b+r[4]*x+r[8]*w+r[12],s[13]=r[1]*b+r[5]*x+r[9]*w+r[13],s[14]=r[2]*b+r[6]*x+r[10]*w+r[14],s[15]=r[3]*b+r[7]*x+r[11]*w+r[15]):(a=r[0],h=r[1],u=r[2],c=r[3],l=r[4],d=r[5],p=r[6],f=r[7],m=r[8],v=r[9],g=r[10],y=r[11],s[0]=a,s[1]=h,s[2]=u,s[3]=c,s[4]=l,s[5]=d,s[6]=p,s[7]=f,s[8]=m,s[9]=v,s[10]=g,s[11]=y,s[12]=a*b+l*x+m*w+r[12],s[13]=h*b+d*x+v*w+r[13],s[14]=u*b+p*x+g*w+r[14],s[15]=c*b+f*x+y*w+r[15]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),n=e[4],o=e[5],a=e[6],h=e[7],u=e[8],c=e[9],l=e[10],d=e[11];e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=n*r+u*s,t[5]=o*r+c*s,t[6]=a*r+l*s,t[7]=h*r+d*s,t[8]=u*r-n*s,t[9]=c*r-o*s,t[10]=l*r-a*s,t[11]=d*r-h*s}(this.model,this.model,e[0]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),n=e[0],o=e[1],a=e[2],h=e[3],u=e[8],c=e[9],l=e[10],d=e[11];e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=n*r-u*s,t[1]=o*r-c*s,t[2]=a*r-l*s,t[3]=h*r-d*s,t[8]=n*s+u*r,t[9]=o*s+c*r,t[10]=a*s+l*r,t[11]=h*s+d*r}(this.model,this.model,e[1]),function(t,e,i){var s=Math.sin(i),r=Math.cos(i),n=e[0],o=e[1],a=e[2],h=e[3],u=e[4],c=e[5],l=e[6],d=e[7];e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=n*r+u*s,t[1]=o*r+c*s,t[2]=a*r+l*s,t[3]=h*r+d*s,t[4]=u*r-n*s,t[5]=c*r-o*s,t[6]=l*r-a*s,t[7]=d*r-h*s}(this.model,this.model,e[2])}get_model(){return this.model}}class g{constructor(t,e,i){this.blocks=[],this.size=i,this.x=t,this.y=e}createChunk(t){for(var e=0;e<this.size;e++){this.blocks[e]=[];for(var i=0;i<this.size;i++){this.blocks[e][i]=[];const r=this.x*this.size+e,n=this.y*this.size+i;let o=t(r,n);for(var s=-1;s<o;s++)this.blocks[e][i][s]=new m([r,n,s])}}}neighbors(t,e,i){var s=[];const r=this.blocks[t][e][i];return null==r?[]:(0!=t&&null!=this.blocks[t-1][e][i]||s.push(new v([r.position[0]-.5,r.position[1],r.position[2]],[p(90),p(-90),0],"grass-side")),t!=this.size-1&&null!=this.blocks[t+1][e][i]||s.push(new v([r.position[0]+.5,r.position[1],r.position[2]],[p(90),p(90),0],"grass-side")),0!=e&&null!=this.blocks[t][e-1][i]||s.push(new v([r.position[0],r.position[1]-.5,r.position[2]],[p(90),p(0),p(0)],"grass-side")),e!=this.size-1&&null!=this.blocks[t][e+1][i]||s.push(new v([r.position[0],r.position[1]+.5,r.position[2]],[p(-90),p(0),p(180)],"grass-side")),null==this.blocks[t][e][i-1]&&s.push(new v([r.position[0],r.position[1],r.position[2]-.5],[p(0),p(180),p(0)],"dirt")),null==this.blocks[t][e][i+1]&&s.push(new v([r.position[0],r.position[1],r.position[2]+.5],[p(0),p(0),p(0)],"grass-top")),s)}}var y=i(398);class b{constructor(t,e){this.chunkSize=t,this.center=e/2,this.mapSize=e,this.chunks=[],this.simplex=new y.SimplexNoise,this.lacunarity=2,this.persistance=.5}octave(t,e,i){let s=Math.pow(this.lacunarity,i),r=Math.pow(this.persistance,i);return this.simplex.noise(t/150*s,e/150*s)*r}createChunk(t,e){(t>=this.mapSize-1||e>=this.mapSize-1)&&(this.mapSize+=2);let i=new g(t,e,this.chunkSize);return i.createChunk(((t,e)=>{var i=this.octave(t,e,0)+this.octave(t,e,1)+this.octave(t,e,2);return Math.max(0,Math.floor(25*i)+25)})),this.chunks.push(i),i}getChunk(t,e){const i=t+this.center,s=e+this.center;return this.chunks[i*this.mapSize+s]}getObjectData(){let t=[];this.chunks.forEach((e=>{for(var i=0;i<e.blocks.length;i++)for(var s=0;s<e.blocks.length;s++)for(var r=-1;r<e.blocks[i][s].length;r++)t.push(...e.neighbors(i,s,r))}));const e=new Float32Array(16*t.length),i=new Float32Array(2*t.length);var s=0;return t.forEach((t=>{for(var r=t.get_model(),n=0;n<16;n++)e[16*s+n]=r.at(n);switch(t.type){case"grass-side":i[2*s]=3/16,i[2*s+1]=0;break;case"grass-top":i[2*s]=0,i[2*s+1]=0;break;case"dirt":i[2*s]=2/16,i[2*s+1]=0}s++})),[e,i]}}class x{constructor(t,e){this.chunkCount=t,this.chunkSize=e,this.i=0,this.player=new f([-20,0,10],0,0),this.mapGen=new b(e,t);const i=Math.floor(t/2);for(var s=-i;s<=i;s++)for(var r=-i;r<=i;r++)this.mapGen.createChunk(s,r);let n=this.mapGen.getObjectData();this.object_data=n[0],this.texture_data=n[1],this.object_count=this.object_data.length/16}update(){this.player.update()}get_textures(){return this.texture_data}get_blocks(){return this.object_data}get_player(){return this.player}player_move(t,e){l(this.player.position,this.player.position,this.player.forwards,e),l(this.player.position,this.player.position,this.player.right,t)}player_look(t,e){this.player.eulers[2]-=t,this.player.eulers[2]%=360,this.player.eulers[1]=Math.min(89,Math.max(-89,this.player.eulers[1]+e))}}const w=document.querySelector("canvas"),M=new class{constructor(t){this.run=()=>{this.scene.update(),this.scene.player_move(this.sideAmount*this.scale,this.forwardAmount*this.scale),this.renderer.render(this.scene.get_blocks(),this.scene.get_textures(),this.scene.object_count,this.scene.get_player()),requestAnimationFrame(this.run)},this.scene=new x(5,32),this.canvas=t,this.renderer=new u(t,this.scene.object_count),this.renderer.Initialize(),this.forwardAmount=0,this.sideAmount=0,this.scale=.5,document.addEventListener("keydown",this.keyDown.bind(this)),document.addEventListener("keyup",this.keyUp.bind(this)),this.canvas.onclick=()=>{this.canvas.requestPointerLock()},this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this))}handleMouseMove(t){this.scene.player_look(t.movementX/10,t.movementY/-10)}keyUp(t){this.forwardAmount=0,this.sideAmount=0}keyDown(t){switch(t.key){case"w":this.forwardAmount=1;break;case"a":this.sideAmount=-1;break;case"s":this.forwardAmount=-1;break;case"d":this.sideAmount=1}}}(w);M.run()})()})();