const ioHook = require('iohook');
const robot = require('robotjs');

const keys = 
{
    17: {is_down: false}, // p1 up
    30: {is_down: false, remap: "mouse_left"}, // p1 left
    31: {is_down: false}, // p1 down
    32: {is_down: false, remap: "mouse_right"}, // p1 right
    23: {is_down: false, remap: "mouse_up"}, // p2 up
    36: {is_down: false}, // p2 left
    37: {is_down: false, remap: "mouse_down"}, // p2 down
    38: {is_down: false}, // p2 right
}

const mouse_traslations = {
    "mouse_left": {x: -20, y: 0},
    "mouse_right": {x: 20, y: 0},
    "mouse_up": {x: 0, y: -20},
    "mouse_down": {x: 0, y: 20}
}

ioHook.on('keydown', (event) => {
    if (keys[event.keycode] == null)
    {
        return;
    }

    keys[event.keycode].is_down = true;
});

ioHook.on('keyup', (event) => {
    if (keys[event.keycode] == null)
    {
        return;
    }

    keys[event.keycode].is_down = false;
});

MouseLoop();

function MouseLoop()
{
    let mousePos = robot.getMousePos();
    for (const key in keys)
    {
        if (keys[key].remap != null && keys[key].is_down == true)
        {
            mousePos = {
                x: mousePos.x + mouse_traslations[keys[key].remap].x,
                y: mousePos.y + mouse_traslations[keys[key].remap].y}
        }
    }

    robot.moveMouse(mousePos.x, mousePos.y);

    setTimeout(() => {
        MouseLoop();
    }, 10);
}

// Register and start hook
ioHook.start();