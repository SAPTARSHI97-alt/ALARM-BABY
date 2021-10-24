img = "";
status = "";
objects = [];
song = "";

function preload(){

}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
     video= createCapture(VIDEO);
     video.size(380,380);
     video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
    

}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "")
    
    {
        r = random(255);
        g = random(255);
        b = random(255);
        
        objectDetector.detect(video, gotResult);
        for(i = 0; i <objects.length; i++){
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are:" + objects.length;
            document.getElementById("status").innerHTML = "status: baby detected";
            document.getElementById("hidden status").innerHTML = "status: baby not detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+ ""+ percent+ "%",objects[i].x+15 + objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            song.setVolume(volume);
        }
    
        
        fill(r, g, b);
        text("Baby detected", 45, 75);
        noFill();
        stroke(r, g, b);
        rect(30, 60, 450, 350);
        
            
    
    }


}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
       document.getElementById("hidden status").innerHTML = "status: baby detected";
        song = loadSound("ALARM OP.mp3");
       
        
    }
    else{
        console.log(results);
        object = results;
        document.getElementById("status").innerHTML = "status: baby not detected";
       
        
    }

}
function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

