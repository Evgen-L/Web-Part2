import { createDefaultEditor, changeTextPosition} from '../myEditorActions'
import { pointType, photoEditorType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newPoint: pointType = {
    x: 100,
    y: 50
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: {
            ...photoEditor.currentState.currentObject,
            point: newPoint
        }
    }
}

describe('changeTextPosition', () => {
    test('change text position', () => {
        expect(changeTextPosition(photoEditor, newPoint)).toStrictEqual(newPhotoEditor)
    })
})