$(function () {
    const pElements = $('.puzzlePart p');
    let zIndex = 10;
    let numberOfWord = 5;
    let leftPosition = 215;

    //make every letter of words span
    pElements.each(function () {
        const words = $(this).text().split(' ');
        const letterSpans = [];

        $(words).each(function () {
            const letters = this.split('');

            $(letters).each(function () {
                const span = $('<span>').text(this);
                letterSpans.push(span);
            });
        });

        $(this).html(letterSpans);
    });

    //when i click shuffle button it will shuffle letters in the widget
    $(".shuffleButton").click(function () {
        //check whether any letter is selected or not.
        let flag = false;
        $('.letterWidget .letters').each(function () {
            if ($(this).attr('id') === "selectedLetter") {
                flag = true;
            }
        });

        if (flag) {
            //animation
            $(".shuffleButton img").animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50);
            return;
        }

        let letters = [];

        $('.letterWidget > .letters').each(function () {
            letters.push($(this).text());
        });

        letters.sort(() => 0.5 - Math.random());

        $('.letterWidget > .letters').each(function (i) {
            $(this).text(letters[i]);
        });
    }).contextmenu(function (event) {
        event.stopPropagation();
        event.preventDefault();
    });

    //shuffle icon hover
    $(".shuffleIcon").hover(function () {
        $(this).attr('src', './src/shuffle-icon-black.png');
    }, function () {
        $(this).attr('src', './src/shuffle-icon-white.png');
    });

    //if I right click to letterWidget function checks whether userWord's context is same with any puzzleWord or not.
    $(".letterWidget").contextmenu(function (event) {
        event.preventDefault();
        let flag = false;

        pElements.each(function () {
            //check whether created word is in puzzle or not. 
            if ($(this).text() === $(".userWord span").text()) {
                let word = $(this);

                if ($(word).hasClass("foundClass")) {
                    $(word).find('span').each(function () {
                        $(this).animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100)
                            .animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100)
                            .animate({ opacity: 0.5 }, 100)
                            .animate({ opacity: 1 }, 100);
                    });
                    return;
                }

                //find every span element and add found class
                $(word).find("span").each(function () {
                    $(this).css('display', 'none');
                    $(this).fadeIn(300);
                    $(this).css({ zIndex: `${zIndex}`, color: 'white', backgroundColor: 'purple' });
                });

                $(word).addClass("foundClass");
                flag = true;
            }

        });

        if (!flag) {
            $(".userWord").animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "-=5px" }, 50)
                .animate({ left: "+=10px" }, 50)
                .animate({ left: "-=5px" }, 50, resetUserWord);
        } else {
            resetUserWord();
        }

        //deselect selected letters after checking userWord.
        $(".letterWidget .letters").each(function () {
            if ($(this).attr('id') === "selectedLetter") {
                $(this).removeAttr('id');
            }
        });

        //check whether every word is found or not. If found call gameOver function.
        let i = 0;
        pElements.each(function () {
            if ($(this).hasClass("foundClass")) {
                i += 1;
            }

            if (i === numberOfWord) {
                gameOver();
            }
        });
    });

    //add selected letters to userWord.
    $(".letterWidget .letters").each(function () {
        $(this).click(function () {
            if ($(this).attr('id') === 'selectedLetter') {
                $(this).animate({ top: "-=5px" }, 50)
                    .animate({ top: "+=10px" }, 50)
                    .animate({ top: "-=5px" }, 50)
                    .animate({ top: "-=5px" }, 50)
                    .animate({ top: "+=10px" }, 50)
                    .animate({ top: "-=5px" }, 50);
                return;
            }

            $(this).attr('id', 'selectedLetter');

            let currentText = $(".userWord span").text();
            $(".userWord span").text(currentText + $(this).text());

            if ($(".userWord span").text() !== "") {
                $(".userWord").css('display', 'block').css('left', `${leftPosition}px`);
                leftPosition -= 7;
            }
        }).contextmenu(function (event) {
            event.stopPropagation();
            event.preventDefault();
        });
    });

    //bulb icon hover
    $(".bulbIcon").hover(function () {
        $(this).attr('src', './src/bulb-light.png');
    }, function () {
        $(this).attr('src', './src/bulb-dark.png');
    });

    //bulb button events
    let toggleCounter = 0;
    $(".bulbButton").click(function () {
        $(pElements).each(function () {

            if (!$(this).hasClass('foundClass') && toggleCounter % 2 === 0) {

                $(this).find('span').each(function () {
                    $(this).animate({ color: "#999" }, 500);
                });
            } else if (!$(this).hasClass('foundClass') && toggleCounter % 2 === 1) {

                $(this).find('span').each(function () {
                    $(this).animate({ color: "#fff" }, 500);
                });
            } else {
                $(this).find('span').each(function () {
                    $(this).css('color', 'white');
                });
            }
        });
        toggleCounter += 1;
    });

    function gameOver() {
        console.log("Game Over");

        let greyScreen = $('<div id="greyScreen">Congrulations!</div>');
        greyScreen.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            color: 'white',
            textAlign: 'center',
            fontSize: '50px'
        });

        $('body').append(greyScreen);
    }

    function resetUserWord() {
        zIndex += 5;
        $(".userWord span").text("");
        $(".userWord").css('display', 'none');
        leftPosition = 215;
    }
});