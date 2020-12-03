import { createDefaultEditor, changeTextColor } from '../myEditorActions'
import { colorType, photoEditorType } from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newColor: colorType = {
    r: 255,
    g: 0,
    b: 255,
    a: 255
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        textSettings: {
            ...photoEditor.currentState.textSettings,
            color: newColor 
        }
    }
}

describe('changeTextColor', () => {
    test('change text color', () => {
        expect(changeTextColor(photoEditor, newColor)).toStrictEqual(newPhotoEditor)
    })
})




