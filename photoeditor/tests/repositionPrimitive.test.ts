import { createDefaultEditor, repositionPrimitive } from '../myEditorActions'
import { photoEditorType, pointType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newPosition: pointType = {
    x: 14,
    y: 17
}

const newPhotoEditor = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: {
            ...photoEditor.currentState.currentObject,
            point: newPosition
        }
    }
}

describe('repositionPrimitive', () => {
    test('new primitive position', () => {
        expect(repositionPrimitive(photoEditor, newPosition)).toStrictEqual(newPhotoEditor)
    })
})