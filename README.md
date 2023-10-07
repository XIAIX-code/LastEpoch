# LastEpoch
************************************
       PREFACE & DISCLAIMER:
************************************
First, this tool would not exist if it weren't for "Dammitt" and his website: https://www.lastepochtools.com
I have never met the guy but I can tell you that his work on the website is PHENOMENAL.
I highly recommend throwing some love his way: https://www.lastepochtools.com/donate
Like I said though, I have no/0/zip/natta/none affiliation with him, but I give credit where credit's due!

                            ************************************
                                        W*A*R*N*I*N*G
                            ************************************
                            
                            In the end, you will be editing your
                            character save file. BACK UP YOUR SAVE
                            FOLDER BEFORE CONTINUING!!!!!!!!!!!!
                            
                            ************************************
                                        W*A*R*N*I*N*G
                            ************************************

As for me personally, I'm just a hack that is stealing someone else's website data to get game data (since there's 
no official API (yet)). I then take that data and crudely come up with replacement data for you
to stuff into your character save file. Does it work?... yeah, but I know there are many ways it could be
done better, but for an old lazy man like me, this is what I have.

THE MAIN/ONLY REASON I'M DOING THIS IS BECAUSE THE GAME DOES NOT CURRENTLY HAVE AN API!!
https://support.lastepoch.com/hc/en-us/articles/1260805256609-The-Game-Data-API-Is-Not-Yet-Available

I have no idea how "Dammitt" gets the data for items & skills in the game, but would personally love to know
so that I can get it for myself rather than rip it off his hard work. :(
I almost wonder if "Eleventh Hour Games" has given him special API access because I have no idea how else it
was done, unless he's extracting data from the game files. ¯\_(ツ)_/¯

I digress...


How to use this stuff:

==========================================
PHASE 0: Initially pick your skill(s) in-game
==========================================
    For this all to work correctly, you need to have the skill(s) you want to use this tool to edit
    UNLOCKED and SPECIALIZED in the game!!
    This is key because this tool is all based off the skillID that exists in your save file.
    Your character must have it at least unlocked and able to access in the game for this tool to work.
    You do not need to have the skill on your action bar, it just needs to be unlocked and specialized in.
    You also do not need to have all 5 specializations chosen, just the skill(s) you want to edit with this tool.
-------------------------------------------------------------

Okay, now...

BE SURE THE GAME IS **NOT** RUNNING!
By "not running" I mean you are NOT logged into the character select screen, and you are exited to desktop.

==========================================
PHASE 1: Load character file
==========================================
    Step 1: I would be remiss if I didn't tell you to BACK UP YOUR PLAYER FILE BEFORE CONTINUING!!!
    Step 2: MAKE SURE YOU FOLLOW STEP 1!!!!

    ***********   dramatic break  ***********

        BACK UP YOUR PLAYER FILE NOW!!!

    *****************************************

    Step 3: Really? WTF... Go back up your player file.. I'm dead serious. Thank you.
    Step 4: Open the "lastEpoch.html" file in your browser.
    Step 5: Click the "Choose File" (chrome) or "Browse..." (firefox) button.
    Step 6: Naviate to your Last Epoch character save file located:
                
                C:\Users\<YOUR_LOGON_USER_NAME>\AppData\LocalLow\Eleventh Hour Games\Last Epoch\Saves

                If you only have 1 character, the file will be "1CHARACTERSLOT_BETA_1"
                If you have more than 1 character, then pick the file for the character you want to change skills for.
                If you are unsure which file is for which character, you can always open the file in notepad and the
                very beginning you will see something like this:

                        EPOCH{"characterName":"SuperPally"

                Once you have identified the file you want, pick that as the file to open with this tool.

    Step 7: As soon as you load the file, pick your skill node points as desired.

    Step 8: All you have to do now is click the "Generate Code" button, then:
            (a): copy everything in that textarea (or click "Copy to Clipboard" button).
            (b): open up your character save file (1CHARACTERSLOT_BETA_1) or whatever it was you settled on
                 in notepad (or your favorite text editor i.e. Notepad++).
            (c): select/delete everything and PASTE (overwriting) with what you just copied in (a).
            (d): SAVE THE FILE
-------------------------------------------------------------

That's it folks, you should be able to load up the game now, log into the edited character and
and bring up your skills to view all the juicy (overpowered most likely lol) values.

Remember, you can only edit this file while the game is completely shut down.
Not just logged into character selection, but completely "exited to desktop".

I will soon be adding more functionality to this tool that will allow you to edit passives,
gold, level, experience points, and a few other things, not just skills.

This was just a quick and dirty (easy?) way to edit your skill nodes.
