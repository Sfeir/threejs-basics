
varying vec4 vPosition;
varying vec4 vLocalPosition;

void main()	{
    vLocalPosition = vec4(position,1.0);
    vPosition = projectionMatrix * modelViewMatrix * vLocalPosition;
    gl_Position = vPosition;
}
