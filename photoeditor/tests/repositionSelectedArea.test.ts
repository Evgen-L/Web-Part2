import { createDefaultEditor, repositionSelectedArea } from '../myEditorActions'
import { photoEditorType,  pointType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor()
const newPosition: pointType = {
    x: 1,
    y: 7
}

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        currentObject: {
            ...photoEditor.currentState.currentObject,
            point: newPosition
        }
    }

}

describe('repositionSelectedArea', () => {
    test('new position selected area', () => {
        expect(repositionSelectedArea(photoEditor, newPosition)).toStrictEqual(newPhotoEditor)        
    })
})