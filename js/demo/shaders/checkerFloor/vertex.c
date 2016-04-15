
varying vec4 vPosition;

void main()	{
    vPosition = vec4(position,1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vPosition;
}
