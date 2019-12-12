S::
Loop
{
    GetKeyState, state, S, P
    if state = U
        break
    Send, {WheelDown}
    Sleep, 100
}
return