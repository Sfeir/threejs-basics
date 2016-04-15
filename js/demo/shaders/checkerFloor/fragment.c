
varying vec4 vPosition;

void main()	{

    float randomness = fract(sin(dot(vPosition.xy ,vec2(12.9898,78.233))) * 43758.5453)*0.1;

    vec4 myColor = vec4(0.3+randomness,0,0,1.0);

    float u = 1.0 - floor( mod( vPosition.x, 2.0 ) );
    float v = 1.0 - floor( mod( vPosition.z, 2.0 ) );

    if ( ( u == 1.0 && v < 1.0 ) || ( u < 1.0 && v == 1.0 ) ) {
        myColor = vec4(0.2+randomness, 0, 0, 1.0);
    }

    gl_FragColor = myColor;

}
