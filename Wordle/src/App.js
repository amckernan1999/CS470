/* Author: Andrew McKernan
*  Description: This project is a clone of the NYT wordle. It is a word game that utilizes react state hooks in order
*  to update and mantain 3 seperate components, a keyboard, guess area, and message.
*  Date: 2/25/22
 */

import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

//reads in a random word from list
import {secretWord} from "./wordList";
function App() {

    const numBoxesPerRow = 5;
    const color = 121213;

    // 1 and 2 are placeholders for ent and del after split
    const demoKeys = 'QWERTYUIOPASDFGHJKL1ZXCVBNM2';

    //used as default value and keyboard state
    const initialKeyBoard = () => {
        let keys = demoKeys.split("").map(letter => ({ letter: letter, backgroundColor: 'gray'}));

        keys[19].letter = 'ENT';
        keys[27].letter = 'DEL';
        return keys;
    }

    //the row which our guess is currently in
    const [activeRow, setActiveRow] = useState(new Array(numBoxesPerRow).fill({
        backgroundColor: color
    }));

    //the message that gets displayed at end of game
    //very helpful to set to secretText for debugging
    const[messageTxt, setMessageTxt] = useState('fart');

    //array of all keyboard items holding letter and color
    const [keyboard, setKeyboard] = useState(initialKeyBoard);

    //current index in active row
    const [activeRowIdx, setActiveRowIdx] = useState(0);

    //the word the user is building as a guess
    const [currentWord, setCurrentWord] = useState("");

    //an array of all submited guess boxes
    const [completedRows, setCompletedRows] = useState(new Array(0).fill(0));

    // an array of the number of guess boxes the user has left
    const [remainingRows, setRemainingRows] = useState(new Array(25).fill({
        backgroundColor: color
    }));

    //a simple bool checking if we have entered an end state
    const [endGame,setEndGame] = useState(false);

   const allBoxes = [ ...completedRows, ...activeRow, ...remainingRows];

    // this is where the bulk of work is done. after a keyboard click
    // we receive the key attributes from keyboard js and process that click
    // in order to modify activeRow color, letter, and keyboard key color
    // this also does game logic
    const keyboardPressedCallback = (clickKeyAttributes) =>{

        const {letter} = clickKeyAttributes;
        if(endGame)
            return;

       else if(letter === "DEL" && !endGame)
        {
            //dont delete empty row
            if(!activeRowIdx)
                return;

            setCurrentWord(currentWord.substring(0,currentWord.length - 1));
            const newActiveRowIdx = activeRowIdx;
            changeLetter(activeRowIdx - 1, '');
            setActiveRowIdx(newActiveRowIdx - 1);
        }

        else if( letter === "ENT")
        {
            //if not full word yet
            if(currentWord.length !== 5)
                return;

            let newCompletedRows = completedRows.slice();
            let newKeyboard= keyboard.slice();
            let used = new Array(5).fill(false);

            for( let i = 0; i < 5; i++) {
                    if (activeRow[i].letter === secretWord[i]) {
                        used[i] = true;
                    }
            }

            //actually sets key color and activerow info
            for( let i = 0; i < 5; i++) {

                if(activeRow[i].letter === secretWord[i]){
                    newCompletedRows.push({letter: activeRow[i].letter, backgroundColor: '#538d4e'});
                    newKeyboard[demoKeys.indexOf(activeRow[i].letter)] = {
                        letter: activeRow[i].letter,
                        backgroundColor: '#538d4e'
                    };
                }

                else{
                    let flag = false;
                    for( let j = 0; j < 5; j++) {
                        if (i !== j && activeRow[i].letter === secretWord[j] && !used[j] && !flag) {
                            //used[i] = true;
                            flag = true;
                            used[j] = true;

                            newCompletedRows.push({letter: activeRow[i].letter, backgroundColor: '#b59f3b'});
                            //dont overide green
                            if (keyboard[demoKeys.indexOf(activeRow[i].letter)].backgroundColor !== '#538d4e')
                                newKeyboard[demoKeys.indexOf(activeRow[i].letter)] = {
                                    letter: activeRow[i].letter,
                                    backgroundColor: '#b59f3b'
                                };
                        }
                    }
                    //dont mark gray if its already marked yellow
                    if(!flag){
                            newCompletedRows.push({letter: activeRow[i].letter, backgroundColor: '#3a3a3c'});
                            //dont overwrite green or yellow
                            if(newKeyboard[demoKeys.indexOf(activeRow[i].letter)].backgroundColor !== '#538d4e'
                                && newKeyboard[demoKeys.indexOf(activeRow[i].letter)].backgroundColor !== '#b59f3b')
                            {
                                newKeyboard[demoKeys.indexOf(activeRow[i].letter)] = {
                                    letter: activeRow[i].letter,
                                    backgroundColor: '#3a3a3c'
                                };
                            }
                    }
                }
            }


            setKeyboard(newKeyboard);

            if(secretWord === currentWord)
            {
                setMessageTxt("Correct!");
                setActiveRow(newCompletedRows.slice(-5));
                setEndGame(true);
                return;
            }
            //out of guesses
            else if(remainingRows.length === 0 )
            {

                setMessageTxt("Out of guesses\nthe word was " + secretWord);
                setActiveRow(newCompletedRows.slice(-5));
                setEndGame(true);
                return;
            }
            //reset index in row
            setActiveRowIdx(0);
            //reset currentWord
            setCurrentWord("");
            setCompletedRows(newCompletedRows);


                setRemainingRows((remainingRows.slice(5)))
                setActiveRow(new Array(5).fill({
                    backgroundColor: color,
                    letter: ''
                }));
        }
        //most common case
        else if(activeRowIdx < 5){
            const newActiveRowIdx = activeRowIdx;
            changeLetter(activeRowIdx,letter);
            setActiveRowIdx(newActiveRowIdx + 1);
            const newCurrentWord = currentWord.slice();
            setCurrentWord(newCurrentWord + letter);

        }

    }

    //used to change letter of guess box at idx
    const changeLetter = (idx,letter) => {

            const newActiveRow = activeRow.slice();
            newActiveRow[idx] = {
                letter: letter,
                backgroundColor: color
            }
            setActiveRow(newActiveRow);


    }

    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-top ',
                backgroundColor: '121213'
            }}
          >
              <TopBanner />
              <GuessArea guessAreaBoxes={allBoxes}/>
              <MessageCenter messageTxt ={messageTxt} />
              <Keyboard keyboard={keyboard}  onClickCallback={keyboardPressedCallback}/>
          </Box>
      </Fragment>
  );
}

export default App;
