This is a quick upload of the hack-ish Valetudo fork that I run on my Dreame W10. 
Most likely, you want to go to https://github.com/Hypfer/Valetudo/ instead.

This is only useful for software developers 
because you'll need to patch the `executeMapCommand()` calls in
`frontend/src/HajoDashboard.tsx` 
with the correct IDs obtained out of either
`/data/log/map_info.bin` or `/tmp/mult_map.bin`
on the robot.

Screenshots:
[Screenshot_20221225-213228.png]()
[Screenshot_20221225-213236.png]()

As you can see, I also built a new dashboard, 
replaced the icon with a friendly green robot,
and renamed things to "Laura", 
to make things child-friendly
and easier to use for non-technical people, too.
BTW, "lau nhà" in Vietnamese means "mopping", hence the name.

I moved the old map view and all "expert settings" to the URL
`/#/oldmap` in case you need them.

You should be able to create multiple maps by just carrying the device to a new area
and running a mapping pass. But to get you started, here's my log of miio comands that I used:

Property for Multi-Floor support:
`siid: 6, piid: 7`

Fast mapping:
`siid: 4, aiid: 1, value: 21`

Change map:
`siid: 6, aiid: 2, piid: 4, value: JSON.stringify({sm: {}, mapid: map_id})`

Rename map:
`siid: 6, aiid: 2, piid: 4, value: JSON.stringify({"nrism": {map_id: {"name": map_name}}})`

Delete map:
`siid: 6, aiid: 2, piid: 4, value: JSON.stringify({cm: {}, mapid: map_id})`
