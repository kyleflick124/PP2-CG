var gl = '';

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

var xRotationMatrix = new Float32Array(16);
var yRotationMatrix = new Float32Array(16);

var xTranslationMatrix = new Float32Array(16);
var yTranslationMatrix = new Float32Array(16);

var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);
var angle = Math.PI / 100;

window.addEventListener('keypress', (event) => {
    if(event.key === '6') {
        // angle += Math.PI / 100;
		glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
		glMatrix.mat4.mul(worldMatrix, xRotationMatrix, worldMatrix)
    }else if(event.key === '2') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [1, 0, 0]);
        glMatrix.mat4.mul(worldMatrix, yRotationMatrix, worldMatrix)
    }else if(event.key === '8') {
        // angle += Math.PI / 100;
        glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [-1, 0, 0]);
        glMatrix.mat4.mul(worldMatrix, yRotationMatrix, worldMatrix)
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
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [0, 0.1, 0]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
    }else if(event.key === 'a') {
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [-0.1, 0, 0]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
    }else if(event.key === 's') {
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [0, -0.1, 0]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
    }else if(event.key === 'd') {
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [0.1, 0, 0]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
    }else if(event.key === 'q') {
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [0, 0, -0.1]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
    }else if(event.key === 'e') {
        glMatrix.mat4.translate(xTranslationMatrix, identityMatrix, [0, 0, 0.1]);
        glMatrix.mat4.mul(worldMatrix, xTranslationMatrix, worldMatrix)
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
    gl = canvas.getContext('webgl');

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
        // angle = 1000 / 6 * 2 * Math.PI;
		// glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
		// glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
        // glMatrix.mat4.rotateY(viewMatrix, viewMatrix, angle * 10);
		// glMatrix.mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix)
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        gl.clearColor(0.537, 0.812, 0.941, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

}