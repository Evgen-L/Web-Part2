import { createDefaultEditor, choiceTextSize } from '../myEditorActions'
import {photoEditorType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newTextSize = 9

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        textSettings: {
            ...photoEditor.currentState.textSettings,
            textSize: newTextSize 
        }
    }
}

describe('choiceTextSize', () => {
    test('choice text size', () => {
        expect(choiceTextSize(photoEditor, newTextSize)).toStrictEqual(newPhotoEditor)
    })
})




