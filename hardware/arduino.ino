const int trigPin = 5;
const int echoPin = 4;
const int buzzerPin = 3; 

// VOLUME SETTING: 5 is whisper, 255 is loud.
int volume = 15; 

void setup() {
  // Increased to 115200 for faster communication with the Pi
  Serial.begin(115200); 
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  long duration, distance;
  
  // 1. Trigger the sensor
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // 2. Measure the bounce back
  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) / 29.1;

  // 3. Data Cleanup & Export
  // Only send valid distances (ignore 0 or ghost readings over 4 meters)
  if (distance > 2 && distance < 400) {
    Serial.println(distance); 
  }

  // 4. Smart Haptic/Audio Feedback
  // If an object is closer than 50cm
  if (distance > 0 && distance < 50) {
    // Map the distance to a pause: Closer = Faster beeps!
    // 0cm -> 40ms pause | 50cm -> 200ms pause
    int pauseTime = map(distance, 0, 50, 40, 200);
    
    analogWrite(buzzerPin, volume); 
    delay(60); // Duration of the beep
    analogWrite(buzzerPin, 0); 
    delay(pauseTime); 
  } else {
    // Idle state: just a small delay to keep the loop stable
    analogWrite(buzzerPin, 0);
    delay(100); 
  }
}