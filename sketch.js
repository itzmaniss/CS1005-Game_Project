/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
	push();
	translate(gameChar_x, gameChar_y);
	fill('#FFFF00');
	ellipse(0, -25, 35, 35);
	ellipse(0, -50, 30, 30);
	fill('#FFFFFF');
	ellipse(-6, -52, 8, 8);
	fill('#00BFFF');
	ellipse(-6, -52, 6, 6);
	fill('#000000');
	ellipse(-6, -52, 3, 3);
	fill('#FFFFFF');
	ellipse(6, -52, 8, 8);
	fill('#00BFFF');
	ellipse(6, -52, 6, 6);
	fill('#000000');
	ellipse(6, -52, 3, 3);
	fill("#BA8E23");
	triangle(0, -45, -4, -40, 4, -40);
	stroke(0);
	strokeWeight(3);
	noFill();
	line(-8, -8, -15, -2);
	line(-15, -2, -18, -2);
	line(8, -8, 15, -2);
	line(15, -2, 18, -2);
	pop();

	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
	push();
	translate(gameChar_x, gameChar_y);
	fill('#FFFF00');
	ellipse(0, -35, 35, 35);
	ellipse(0, -60, 30, 30);
	fill('#FFFFFF');
	ellipse(-6, -62, 8, 8);
	fill('#00BFFF');
	ellipse(-6, -62, 6, 6);
	fill('#000000');
	ellipse(-6, -62, 3, 3);
	fill('#FFFFFF');
	ellipse(6, -62, 8, 8);
	fill('#00BFFF');
	ellipse(6, -62, 6, 6);
	fill('#000000');
	ellipse(6, -62, 3, 3);
	fill("#BA8E23");
	triangle(0, -55, -4, -50, 4, -50);
	stroke(0);
	strokeWeight(3);
	noFill();
	line(-8, -18, -12, -10);
	line(-12, -10, -15, -10);
	line(8, -18, 12, -10);
	line(12, -10, 15, -10);
	pop();

	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...

	push();
	translate(gameChar_x, gameChar_y);
	scale(-1, 1);
	fill('#FFFF00');
	ellipse(-3, -25, 35, 35);
	ellipse(0, -50, 30, 30);
	fill('#FFFFFF');
	ellipse(8, -52, 10, 10);
	fill('#00BFFF');
	ellipse(9, -52, 7, 7);
	fill('#000000');
	ellipse(10, -52, 4, 4);
	fill("#BA8E23");
	triangle(13, -52, 20, -48, 13, -44);
	stroke(0);
	strokeWeight(3);
	line(-8, -8, -8, -2);
	line(-8, -2, -3, -2);
	pop();


	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...

	push();
	translate(gameChar_x, gameChar_y);
	fill('#FFFF00');
	ellipse(-3, -25, 35, 35);
	ellipse(0, -50, 30, 30);
	fill('#FFFFFF');
	ellipse(8, -52, 10, 10);
	fill('#00BFFF');
	ellipse(9, -52, 7, 7);
	fill('#000000');
	ellipse(10, -52, 4, 4);
	fill("#BA8E23");
	triangle(13, -52, 20, -48, 13, -44);
	stroke(0);
	strokeWeight(3);
	line(-8, -8, -8, -2);
	line(-8, -2, -3, -2);
	pop();

	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...

	push();
	translate(gameChar_x, gameChar_y);
	fill('#FFFF00');
	ellipse(0, -35, 35, 35);
	ellipse(3, -60, 30, 30);
	fill('#FFFFFF');
	ellipse(11, -62, 10, 10);
	fill('#00BFFF');
	ellipse(12, -62, 7, 7);
	fill('#000000');
	ellipse(13, -62, 4, 4);
	fill("#BA8E23");
	triangle(16, -62, 23, -58, 16, -54);
	stroke(0);
	strokeWeight(3);
	line(-5, -18, -3, -10);
	line(-3, -10, 2, -10);
	pop();

	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...

	push();
	translate(gameChar_x, gameChar_y);
	scale(-1, 1);
	fill('#FFFF00');
	ellipse(0, -35, 35, 35);
	ellipse(3, -60, 30, 30);
	fill('#FFFFFF');
	ellipse(11, -62, 10, 10);
	fill('#00BFFF');
	ellipse(12, -62, 7, 7);
	fill('#000000');
	ellipse(13, -62, 4, 4);
	fill("#BA8E23");
	triangle(16, -62, 23, -58, 16, -54);
	stroke(0);
	strokeWeight(3);
	line(-5, -18, -3, -10);
	line(-3, -10, 2, -10);
	pop();
}
