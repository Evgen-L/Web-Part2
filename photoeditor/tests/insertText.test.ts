import { createDefaultEditor, insertText} from '../myEditorActions'
import { photoEditorType, textType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newText: textType = {
    value: 'WebPart2',
    size: {
        width: 10,
        height: 5
    },
    point: {
        x: 5,
        y: 5
    }
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: newText 
    }
}

describe('insertText', () => {
    test('insert text', () => {
        expect(insertText(photoEditor, newText)).toStrictEqual(newPhotoEditor)
    })
})