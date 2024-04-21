(()=>{"use strict";const e="struct TransformationData {\n  model: mat4x4<f32>,\n  view: mat4x4<f32>,\n  projection: mat4x4<f32>\n};\n@binding(0) @group(0) var<uniform> transformUBO : TransformationData;\n\nstruct Fragment {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) Color: vec4<f32>\n};\n\n@vertex\nfn vs_main(@location(0) vertexPostion: vec3<f32>, @location(1) vertexColor: vec3<f32>) -> Fragment {\n\n    var output: Fragment;\n    output.Position = transformUBO.projection * transformUBO.view * transformUBO.model * vec4<f32>(vertexPostion, 1.0);\n    output.Color = vec4<f32>(vertexColor, 1.0);\n\n    return output;\n}\n\n@fragment\nfn fs_main(@location(0) Color: vec4<f32>) -> @location(0) vec4<f32> {\n    return Color;\n}\n";class t{constructor(e){const t=new Float32Array([0,-.5,-.5,0,1,0,0,.5,-.5,0,0,1,0,-.5,.5,1,1,0,0,-.5,.5,1,1,0,0,.5,-.5,0,0,1,0,.5,.5,1,0,0]),i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,r={size:t.byteLength,usage:i,mappedAtCreation:!0};this.buffer=e.createBuffer(r),new Float32Array(this.buffer.getMappedRange()).set(t),this.buffer.unmap(),this.bufferLayout={arrayStride:24,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x3",offset:12}]}}}var i=1e-6,r="undefined"!=typeof Float32Array?Float32Array:Array;function n(){var e=new r(16);return r!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var a=function(e,t,i,r){return new(i||(i=Promise))((function(n,a){function o(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,s)}u((r=r.apply(e,t||[])).next())}))};const o=document.querySelector("canvas"),s=new class{constructor(e){this.render=()=>{this.t+=.01,this.t>2*Math.PI&&(this.t-=2*Math.PI);const e=n(),t=n(),r=n();var a,o,s,u,f,c,h,d,v,l,p,m,y,g,M,b,P,B,x,w,U,q,C;(function(e,t,i,r,n){var a,o=1/Math.tan(t/2);e[0]=o/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(a=1/(r-n),e[10]=(n+r)*a,e[14]=2*n*r*a):(e[10]=-1,e[14]=-2*r)})(e,Math.PI/4,800/600,.1,10),a=t,M=(o=[-2,0,2])[0],b=o[1],P=o[2],B=(u=[0,0,1])[0],x=u[1],w=u[2],U=(s=[0,0,0])[0],q=s[1],C=s[2],Math.abs(M-U)<i&&Math.abs(b-q)<i&&Math.abs(P-C)<i?function(e){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(a):(p=M-U,m=b-q,y=P-C,f=x*(y*=g=1/Math.hypot(p,m,y))-w*(m*=g),c=w*(p*=g)-B*y,h=B*m-x*p,(g=Math.hypot(f,c,h))?(f*=g=1/g,c*=g,h*=g):(f=0,c=0,h=0),d=m*h-y*c,v=y*f-p*h,l=p*c-m*f,(g=Math.hypot(d,v,l))?(d*=g=1/g,v*=g,l*=g):(d=0,v=0,l=0),a[0]=f,a[1]=d,a[2]=p,a[3]=0,a[4]=c,a[5]=v,a[6]=m,a[7]=0,a[8]=h,a[9]=l,a[10]=y,a[11]=0,a[12]=-(f*M+c*b+h*P),a[13]=-(d*M+v*b+l*P),a[14]=-(p*M+m*b+y*P),a[15]=1),function(e,t,r,n){var a,o,s,u,f,c,h,d,v,l,p,m,y,g,M,b,P,B,x,w,U,q,C,A,F=n[0],G=n[1],O=n[2],L=Math.hypot(F,G,O);L<i||(F*=L=1/L,G*=L,O*=L,a=Math.sin(r),s=1-(o=Math.cos(r)),u=t[0],f=t[1],c=t[2],h=t[3],d=t[4],v=t[5],l=t[6],p=t[7],m=t[8],y=t[9],g=t[10],M=t[11],b=F*F*s+o,P=G*F*s+O*a,B=O*F*s-G*a,x=F*G*s-O*a,w=G*G*s+o,U=O*G*s+F*a,q=F*O*s+G*a,C=G*O*s-F*a,A=O*O*s+o,e[0]=u*b+d*P+m*B,e[1]=f*b+v*P+y*B,e[2]=c*b+l*P+g*B,e[3]=h*b+p*P+M*B,e[4]=u*x+d*w+m*U,e[5]=f*x+v*w+y*U,e[6]=c*x+l*w+g*U,e[7]=h*x+p*w+M*U,e[8]=u*q+d*C+m*A,e[9]=f*q+v*C+y*A,e[10]=c*q+l*C+g*A,e[11]=h*q+p*C+M*A,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]))}(r,r,this.t,[0,0,1]),this.device.queue.writeBuffer(this.uniformBuffer,0,r),this.device.queue.writeBuffer(this.uniformBuffer,64,t),this.device.queue.writeBuffer(this.uniformBuffer,128,e);const A=this.device.createCommandEncoder(),F={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}]},G=A.beginRenderPass(F);G.setPipeline(this.pipeline),G.setVertexBuffer(0,this.squareMesh.buffer),G.setBindGroup(0,this.bindGroup),G.draw(6),G.end(),this.device.queue.submit([A.finish()]),requestAnimationFrame(this.render)},this.canvas=e,this.t=0}Initialize(){return a(this,void 0,void 0,(function*(){yield this.setupDevice(),this.createAssets(),yield this.makePipeline(),this.render()}))}setupDevice(){return a(this,void 0,void 0,(function*(){this.adapter=yield navigator.gpu.requestAdapter(),this.device=yield this.adapter.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})}))}makePipeline(){return a(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:192,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const t=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}}]});this.bindGroup=this.device.createBindGroup({layout:t,entries:[{binding:0,resource:{buffer:this.uniformBuffer}}]});const i=this.device.createPipelineLayout({bindGroupLayouts:[t]});this.pipeline=this.device.createRenderPipeline({layout:i,vertex:{module:this.device.createShaderModule({code:e}),entryPoint:"vs_main",buffers:[this.squareMesh.bufferLayout]},fragment:{module:this.device.createShaderModule({code:e}),entryPoint:"fs_main",targets:[{format:this.format}]},primitive:{topology:"triangle-list"}})}))}createAssets(){this.squareMesh=new t(this.device)}}(o);s.Initialize()})();