import { createDefaultEditor, usingFilters } from '../myEditorActions'
import {photoEditorType, filtersType} from '../myEditorModels'

const photoEditor: photoEditorType = createDefaultEditor() 
const newFilter: filtersType = 'red'

const newPhotoEditor: photoEditorType = {
    ...photoEditor,
    currentState: {
        ...photoEditor.currentState,
        filter: newFilter
    }
}

describe('usingFilters', () => {
    test('choise filter', () => {
        expect(usingFilters(photoEditor, newFilter)).toStrictEqual(newPhotoEditor)
    })
})