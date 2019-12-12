const ioHook = require('iohook');
const robot = require('robotjs');

const keys = 
{
    17: {is_down: false}, // p1 up
    30: {is_down: false, remap: "mouse_left"}, // p1 left
    31: {is_down: false, remap: "mouse_scroll"}, // p1 down
    32: {is_down: false, remap: "mouse_right"}, // p1 right
    23: {is_down: false, remap: "mouse_up"}, // p2 up
    36: {is_down: false, remap: "mouse_leftclick"}, // p2 left
    37: {is_down: false, remap: "mouse_down"}, // p2 down
    38: {is_down: false, remap: "mouse_rightclick"}, // p2 right
}

const mouse_traslations = {
    "mouse_left": {x: -30, y: 0},
    "mouse_right": {x: 30, y: 0},
    "mouse_up": {x: 0, y: -30},
    "mouse_down": {x: 0, y: 30}
}

ioHook.on('keydown', (event) => {
    if (keys[event.keycode] == null)
    {
        return;
    }

    if (keys[event.keycode].remap == "mouse_leftclick")
    {
        robot.mouseToggle("down", "left");
    }
    else if (keys[event.keycode].remap == "mouse_rightclick")
    {
        robot.mouseToggle("down", "right");
    }

    keys[event.keycode].is_down = true;
});

ioHook.on('keyup', (event) => {
    if (keys[event.keycode] == null)
    {
        return;
    }

    if (keys[event.keycode].remap == "mouse_leftclick")
    {
        robot.mouseToggle("up", "left");
    }
    else if (keys[event.keycode].remap == "mouse_rightclick")
    {
        robot.mouseToggle("up", "right");
    }
    else if (keys[event.keycode].remap == "mouse_scroll")
    {
        robot.scrollMouse(0, -1); // Doesn't work, use autohotkey :(
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
            if (mouse_traslations[keys[key].remap] != null)
            {
                mousePos = {
                    x: mousePos.x + mouse_traslations[keys[key].remap].x,
                    y: mousePos.y + mouse_traslations[keys[key].remap].y}
            }
        }
    }

    const origMousePos = robot.getMousePos();
    if (mousePos.x != origMousePos.x || mousePos.y != origMousePos.y)
    {
        robot.moveMouse(mousePos.x, mousePos.y);
    }

    setTimeout(() => {
        MouseLoop();
    }, 10);
}

// Register and start hook
ioHook.start();