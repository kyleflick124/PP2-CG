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
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            a[i*4 + j] = (a[i*4] * b[j]) + (a[i*4 + 1] * b[4 + j]) + (a[i*4 + 2] * b[8 + j]) + (a[i*4 + 3] * b[12 + j]);
        }
    }
    return a;
}

function pointMul(point, matrix){
    for(var i = 0; i < 4; i++){
        point[i] = (matrix[i*4] * point[0]) + (matrix[i*4 + 1] * point[1]) + (matrix[i*4 + 2] * point[2]) + (matrix[i*4 + 3] * point[3]);
    }
    return point;
}

function createMatrix(type, transformX = null, transformY = null, transformZ = null, axisR = null, inverted = false){
    var matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
    const angleSin = inverted ? -0.14 : 0.14;
    const angleCos = 0.99;
    switch (type) {
        case 't':
            matrix[3] = transformX;
            matrix[7] = transformY;
            matrix[11] = transformZ;
            break;
        case 'r':
            var tMatrix = [
                1, 0, 0, transformX,
                0, 1, 0, transformY,
                0, 0, 1, transformZ,
                0, 0, 0, 1,
            ];
            var sMatrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
            switch (axisR) {
                case 'x':
                    matrix[5] = angleCos;
                    matrix[6] = -angleSin;
                    matrix[9] = angleSin;
                    matrix[10] = angleCos;
                    sMatrix = [
                        1, 0, 0, 0,
                        0, 1.02, 0, 0,
                        0, 0, 1.02, 0,
                        0, 0, 0, 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    matrix = matrixMul(matrix, sMatrix);
                    break;
                case 'y':
                    matrix[0] = angleCos;
                    matrix[2] = angleSin;
                    matrix[8] = -angleSin;
                    matrix[10] = angleCos;
                    sMatrix = [
                        1.02, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1.02, 0,
                        0, 0, 0, 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    matrix = matrixMul(matrix, sMatrix);
                    break;
                case 'z':
                    matrix[0] = angleCos;
                    matrix[1] = -angleSin;
                    matrix[4] = angleSin;
                    matrix[5] = angleCos;
                    sMatrix = [
                        1.02, 0, 0, 0,
                        0, 1.02, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1,
                    ];
                    matrix = matrixMul(tMatrix, matrix);
                    matrix = matrixMul(matrix, sMatrix);
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
    console.log(matrix);
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
        console.log(point);
        point = pointMul(point, matrix);
        console.log(point);
        obj[i] = point[0];
        obj[i + 1] = point[1];
        obj[i + 2] = point[2];
        i += 6;
    }
    return obj;
}

//Criando buffer dos vertices
var boxVertices = 
[ // X, Y, Z           R, G, B
    // Top
    -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
    1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
    1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

    // Left
    -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
    -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
    -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
    -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

    // Right
    1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
    1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
    1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
    1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

    // Front
    1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
    1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

    // Back
    1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
    1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

    // Bottom
    -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
    -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
    1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
    1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
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

var viewMatrix = new Float32Array(16);
var worldMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);
var testMatrix = new Float32Array(16);

var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);
var angle = Math.PI / 100;

window.addEventListener('keypress', (event) => {
    if(event.key === '6') {
        // angle += Math.PI / 100;
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'y');
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '2') {
        // angle += Math.PI / 100;
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x');
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '8') {
        // angle += Math.PI / 100;
        var centroid = getCentroid(boxVertices);
		var tranformMatrix = createMatrix('r', centroid[0], centroid[1], centroid[2], 'x', true);
        boxVertices = tranformObject(boxVertices, tranformMatrix);
    }else if(event.key === '4') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, -1, 0]);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '7') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, -1, 0]);
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [-1, 0, 0]);
        glMatrix.mat4.mul(xRotationMatrix, xRotationMatrix, yRotationMatrix);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '9') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [-1, 0, 0]);
        glMatrix.mat4.mul(xRotationMatrix, xRotationMatrix, yRotationMatrix);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '1') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, -1, 0]);
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [1, 0, 0]);
        glMatrix.mat4.mul(xRotationMatrix, xRotationMatrix, yRotationMatrix);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '3') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [1, 0, 0]);
        glMatrix.mat4.mul(xRotationMatrix, xRotationMatrix, yRotationMatrix);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '5') {
        // angle += Math.PI / 100;
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
    var gl = canvas.getContext('webgl2');

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