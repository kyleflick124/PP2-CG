function getCentroid(obj){
    var point = [0,0,0];
    // eixo x
    for(var i = 0; i < obj.length/6; i++){
        point[0] += obj[i*6];
    }
    point[0] /= (obj.length/6);
    // eixo y
    for(var i = 0; i < obj.length/6; i++){
        point[1] += obj[i*6 + 1];
    }
    point[1] /= (obj.length/6);
    // eixo z
    for(var i = 0; i < obj.length/6; i++){
        point[2] += obj[i*6 + 2];
    }
    point[2] /= (obj.length/6);
    return point;
}

function matrixMul(a, b){
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
      a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
      a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
      a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
      a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
      a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
      a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
      a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
      a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
      a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
      a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
      a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
      a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
      a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
      a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
      a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
      a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
    ];
}

function pointMul(point, matrix){
    var m00 = matrix[0 * 4 + 0];
    var m01 = matrix[0 * 4 + 1];
    var m02 = matrix[0 * 4 + 2];
    var m03 = matrix[0 * 4 + 3];
    var m10 = matrix[1 * 4 + 0];
    var m11 = matrix[1 * 4 + 1];
    var m12 = matrix[1 * 4 + 2];
    var m13 = matrix[1 * 4 + 3];
    var m20 = matrix[2 * 4 + 0];
    var m21 = matrix[2 * 4 + 1];
    var m22 = matrix[2 * 4 + 2];
    var m23 = matrix[2 * 4 + 3];
    var m30 = matrix[3 * 4 + 0];
    var m31 = matrix[3 * 4 + 1];
    var m32 = matrix[3 * 4 + 2];
    var m33 = matrix[3 * 4 + 3];
    return [
        m00 * point[0] + m01 * point[1] + m02 * point[2] + m03 * point[3],
        m10 * point[0] + m11 * point[1] + m12 * point[2] + m13 * point[3],
        m20 * point[0] + m21 * point[1] + m22 * point[2] + m23 * point[3],
        m30 * point[0] + m31 * point[1] + m32 * point[2] + m33 * point[3],
    ];
}

function createMatrix(type, transformX = null, transformY = null, transformZ = null, axisR = null, inverted = false){
    var matrix = new Float32Array(16);
    matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    var angleSin = new Float32Array(1);
    var angleCos = new Float32Array(1);
    var radians = 5 * Math.PI/180;
    angleSin[0] = inverted ? -(Math.sin(radians)) : Math.sin(radians);;
    angleCos[0] = Math.cos(radians);;
    console.log(angleCos[0], angleSin[0]);
    switch (type) {
        case 't':
            matrix[3] = transformX;
            matrix[7] = transformY;
            matrix[11] = transformZ;
            break;
        case 'r':
            var tMatrix = new Float32Array(16);
            tMatrix = [
                1, 0, 0, transformX,
                0, 1, 0, transformY,
                0, 0, 1, transformZ,
                0, 0, 0, 1,
            ];
            switch (axisR) {
                case 'x':
                    matrix = [
                        1, 0            , 0             , 0,
                        0, angleCos[0]  , -angleSin[0]  , 0,
                        0, angleSin[0]  , angleCos[0]   , 0,
                        0, 0            , 0             , 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    break;
                case 'y':
                    matrix = [
                        angleCos[0] , 0, angleSin[0], 0,
                        0           , 1, 0          , 0,
                        -angleSin[0], 0, angleCos[0], 0,
                        0           , 0, 0          , 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    break;
                case 'z':
                    matrix = [
                        angleCos[0] , -angleSin[0]  , 0, 0,
                        angleSin[0] , angleCos[0]   , 0, 0,
                        0           , 0             , 1, 0,
                        0           , 0             , 0, 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    break;
            }
            tMatrix = [
                1, 0, 0, -transformX,
                0, 1, 0, -transformY,
                0, 0, 1, -transformZ,
                0, 0, 0, 1,
            ];
            matrix = matrixMul(matrix, tMatrix);
            break;
        case 's':
            matrix[0] = transformX;
            matrix[5] = transformY;
            matrix[10] = transformZ;
            break;
        default:
            break;
    }
    return matrix;
}

function tranformObject(obj, matrix){
    var point = [];
    for(var i = 0; i < obj.length;){
        point = [
            obj[i], 
            obj[i + 1], 
            obj[i + 2], 
            1
        ];
        point = pointMul(point, matrix);
        obj[i] = point[0];
        obj[i + 1] = point[1];
        obj[i + 2] = point[2];
        i += 6;
    }
    return obj;
}

//Criando buffer dos vertices
var boxVertices = [ 
    // X, Y, Z           R, G, B
    // Top
    -0.25, 0.25, -0.25,   0.5, 0.5, 0.5,
    -0.25, 0.25, 0.25,    0.5, 0.5, 0.5,
    0.25, 0.25, 0.25,     0.5, 0.5, 0.5,
    0.25, 0.25, -0.25,    0.5, 0.5, 0.5,

    // Left
    -0.25, 0.25, 0.25,    0.75, 0.25, 0.5,
    -0.25, -0.25, 0.25,   0.75, 0.25, 0.5,
    -0.25, -0.25, -0.25,  0.75, 0.25, 0.5,
    -0.25, 0.25, -0.25,   0.75, 0.25, 0.5,

    // Right
    0.25, 0.25, 0.25,    0.25, 0.25, 0.75,
    0.25, -0.25, 0.25,   0.25, 0.25, 0.75,
    0.25, -0.25, -0.25,  0.25, 0.25, 0.75,
    0.25, 0.25, -0.25,   0.25, 0.25, 0.75,

    // Front
    0.25, 0.25, 0.25,    1.0, 0.0, 0.15,
    0.25, -0.25, 0.25,    1.0, 0.0, 0.15,
    -0.25, -0.25, 0.25,    1.0, 0.0, 0.15,
    -0.25, 0.25, 0.25,    1.0, 0.0, 0.15,

    // Back
    0.25, 0.25, -0.25,    0.0, 1.0, 0.15,
    0.25, -0.25, -0.25,    0.0, 1.0, 0.15,
    -0.25, -0.25, -0.25,    0.0, 1.0, 0.15,
    -0.25, 0.25, -0.25,    0.0, 1.0, 0.15,

    // Bottom
    -0.25, -0.25, -0.25,   0.5, 0.5,1.0,
    -0.25, -0.25, 0.25,    0.5, 0.5, 1.0,
    0.25, -0.25, 0.25,     0.5, 0.5, 1.0,
    0.25, -0.25, -0.25,    0.5, 0.5, 1.0,
];

var boxIndices =
[
    // Top
    0, 1, 2,
    0, 2, 3,

    // Left
    5, 4, 6,
    6, 4, 7,

    // Right
    8, 9, 10,
    8, 10, 11,

    // Front
    13, 12, 14,
    15, 14, 12,

    // Back
    16, 17, 18,
    16, 18, 19,

    // Bottom
    21, 20, 22,
    22, 20, 23
];

var tranformMatrix = createMatrix('t', -5, 2.5, 0, null);
boxVertices = tranformObject(boxVertices, tranformMatrix);

var viewMatrix = new Float32Array(16);
var worldMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);
var testMatrix = new Float32Array(16);

var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);

window.addEventListener('keypress', (event) => {
    if(event.key === '6') {
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y');
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '2') {
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x');
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '8') {
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x', true);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '4') {
        var centroid = getCentroid(boxVertices);
        var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y', true);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '7') {
        var centroid = getCentroid(boxVertices);
        var tranformMatrix1 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x', true);
        var tranformMatrix2 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y', true);
        var tranformMatrix = matrixMul(tranformMatrix1, tranformMatrix2);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '9') {
        var centroid = getCentroid(boxVertices);
        var tranformMatrix1 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x', true);
        var tranformMatrix2 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y');
        var tranformMatrix = matrixMul(tranformMatrix1, tranformMatrix2);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '1') {
        var centroid = getCentroid(boxVertices);
        var tranformMatrix1 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x');
        var tranformMatrix2 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y', true);
        var tranformMatrix = matrixMul(tranformMatrix1, tranformMatrix2);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '3') {
        var centroid = getCentroid(boxVertices);
        var tranformMatrix1 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x');
        var tranformMatrix2 = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y');
        var tranformMatrix = matrixMul(tranformMatrix1, tranformMatrix2);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '5') {
		glMatrix.mat4.identity(worldMatrix);
    }else if(event.key === 'w') {
        var tranformMatrix = createMatrix('t', 0, 0.1, 0, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === 'a') {
        var tranformMatrix = createMatrix('t', -0.1, 0, 0, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === 's') {
        var tranformMatrix = createMatrix('t', 0, -0.1, 0, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === 'd') {
        var tranformMatrix = createMatrix('t', 0.1, 0, 0, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === 'q') {
        var tranformMatrix = createMatrix('t', 0, 0, -0.1, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === 'e') {
        var tranformMatrix = createMatrix('t', 0, 0, 0.1, null);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    } 
})

//Declarando os shaders em formato de string
var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

//Corpo do projeto, carrega no "onload"
var InitProject = function (){
    console.log("funcionou :)");

    var canvas = document.getElementById('main-canvas');
    var gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });

    if(!gl) {
        gl = canvas.getContext('experimental-webgl');
    }

    if(!gl) {
        alert("Your browser does not support WebGL");
    }

    //Ajustando o tamanho do canvas para a tela do usuario
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    //limpando o contexto do webgl
    gl.clearColor(0.537, 0.812, 0.941, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //habilitando profundidade e cull face (carregar apenas as partes visíveis pela câmera)
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);


    //Criando shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error("Error compiling vertex shader", gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('Error compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
		return;
	}

    //Criando o programa com os shaders criados
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

    var boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation, //Attribute location
        3, //Number of elements per attribute
        gl.FLOAT, //type of elements
        gl.FALSE, //normalization
        6 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
        0 //Offset from the beginning of a single vertex to this attribute
    );

    gl.vertexAttribPointer(
        colorAttribLocation, //Attribute location
        3, //Number of elements per attribute
        gl.FLOAT, //type of elements
        gl.FALSE, //normalization
        6 * Float32Array.BYTES_PER_ELEMENT, //Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT //Offset from the beginning of a single vertex to this attribute
    );

    //Habilitar os atributos declarados
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    //Define o programa a ser usado pelo shader
    gl.useProgram(program);

    //Associar matrizes criadas com os shaders
    var matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
    var matViewUniformLocation = gl.getUniformLocation(program, "mView");
    var matProjUniformLocation = gl.getUniformLocation(program, "mProj");

    //Criando as matrizes e setando seus valores para identidade (sem tranformação)
    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.lookAt(viewMatrix, [0, 0, 8], [0, 0, 0], [0, 1, 0]);
    glMatrix.mat4.perspective(projMatrix, 45 * (Math.PI / 180), canvas.width / canvas.height, 0.1, 50.0);

    //Enviando as matrizes para o shader
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    //Loop de renderizacao (atualizacao da tela)
    var loop = function(){
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
        gl.clearColor(0.537, 0.812, 0.941, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

}