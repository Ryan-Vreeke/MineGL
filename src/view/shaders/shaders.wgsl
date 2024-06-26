struct TransformationData {
  view: mat4x4<f32>,
  projection: mat4x4<f32>
};

struct ObjectData {
  model: array<mat4x4<f32>>,
};

struct TextureData{
  texID: array<vec2<f32>>,
}

struct Fragment {
  @builtin(position) Position: vec4<f32>,
  @location(0) TexCoord: vec2<f32>
};

@binding(0) @group(0) var<uniform> transformUBO : TransformationData;
@binding(1) @group(0) var<storage, read> objects: ObjectData;
@binding(4) @group(0) var<storage, read> textures: TextureData;
@binding(2) @group(0) var myTexture: texture_2d<f32>;
@binding(3) @group(0) var mySampler: sampler;

@vertex
fn vs_main(@builtin(instance_index) ID: u32, @location(0) vertexPostion: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {

    var output: Fragment;
    output.Position = transformUBO.projection * transformUBO.view * objects.model[ID] * vec4<f32>(vertexPostion, 1.0);
    output.TexCoord = vertexTexCoord + textures.texID[ID];

    return output;
}

@fragment
fn fs_main(@location(0) TexCoord: vec2<f32>) -> @location(0) vec4<f32> {
    return textureSample(myTexture, mySampler, TexCoord);
}
