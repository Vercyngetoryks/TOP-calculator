# TOP-calculator project

This project is a simple calculator built as part of [The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator) curriculum. The goal was to create a functional calculator using HTML, CSS, and JavaScript, providing support for both mouse and keyboard inputs. This project reinforces skills in JavaScript functions, DOM manipulation, and event handling.

## Project Requirements

According to the project specifications, this calculator:

- Supports basic arithmetic operations: addition, subtraction, multiplication, and division
- Allows consecutive operations without needing to clear after each result
- Provides clear (`AC`) and delete (`DEL`) functions
- Includes keyboard support for enhanced usability
- Displays feedback to users on button presses

## Features

- **Basic Operations**: Addition, subtraction, multiplication, and division.
- **Percentage and Sign Change**: Calculate percentages and toggle between positive and negative values.
- **Delete and Clear Functions**: Remove the last digit or reset the entire calculation.
- **Keyboard and Mouse Support**: Users can input values via mouse clicks or keyboard keys.
- **Flashing Button Effect**: Provides visual feedback with flashing button animations.

## Challenges and Solutions

During the project, a few challenges were encountered, particularly with managing simultaneous keyboard and mouse inputs:

1. **Focus Management**:

   - Switching between mouse and keyboard input sometimes caused unintended highlights or focus states.
   - **Solution**: Used `.blur()` to remove focus from buttons after each interaction, which resolved the issue.

2. **Mixed Input Behavior**:
   - When combining mouse and keyboard actions, certain issues emerged, such as:
     - Unwanted button highlighting (e.g., `AC` or operators).
     - Duplicate calculations when pressing `Enter`.
   - **Solution**: Ensured that `focus` was managed with `.blur()` to avoid lingering effects.
