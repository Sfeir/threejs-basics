
varying vec4 vPosition;
varying vec4 vLocalPosition;

float sq(float a) {
    return a*a;
}

float length(vec4 a, vec4 b) {
	return sqrt( sq(a.x-b.x) + sq(a.y-b.y) + sq(a.z-b.z) );
}

void main()	{

    vec4 originPosition = vec4(0,0,0,0);
    float distance = length(originPosition, vPosition)/50.0;
    float localDistance = length(originPosition, vLocalPosition)/2.0;
    vec4 myColor = vec4(1.0,0.5+distance,(1.0-localDistance)*0.5,1.0);
    gl_FragColor = myColor;

}
