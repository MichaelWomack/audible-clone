import { AudioService } from './audio';
import { Audio } from '../model/audio';
import { firestore } from "firebase";

describe('AudioService', () => {
    let audioService: AudioService;
    let audioCollection: Partial<firestore.CollectionReference>;

    it('is created successfully', () => {
        audioService = new AudioService({});
        expect(audioService).toBeTruthy();
    });

    describe('#getAll', () => {
        it('queries the firestore and filters by userId', async () => {
            const getFn = jest.fn();
            const collection = {
                where: jest.fn(() => ({
                    get: getFn
                }))
            };
            const service = new AudioService(collection);
            const userId = '123';
            await service.getAll(userId);
            expect(collection.where).toHaveBeenCalledWith('userId', '==', userId);
            expect(getFn).toHaveBeenCalled();
        });
    });

    describe('#addAudio', () => {
        beforeEach(() => {
            audioCollection = {
                add: jest.fn((audio: Audio) => audio)
            };
            audioService = new AudioService(audioCollection);
        });

        it("calls the collection's add() with the audio object", async () => {
            const audio: Audio = { title: 'my audio' };
            await audioService.addAudio(audio);
            expect(audioCollection.add).toHaveBeenCalledWith(audio);
        });
    });

    describe('#updateAudio', () => {
        let updateMock: any;
        beforeEach(() => {
            updateMock = jest.fn((audio: Audio) => audio);
            audioCollection = {
                doc: jest.fn((id: string) => {
                    return {
                        update: updateMock
                    }
                })
            };
            audioService = new AudioService(audioCollection);
        });

        it("calls the collection's update() with the audio object", async () => {
            const audio: Audio = { id: "sdflkjdf", title: 'my audio' };
            await audioService.updateAudio(audio);
            expect(audioCollection.doc).toHaveBeenCalledWith(audio.id);
            expect(audioCollection.doc().update).toHaveBeenCalledWith(audio);
        });
    });

    describe("#getAudio", () => {
        const audio: Audio = {
            title: 'title',
            userId: 'xkjdfwl'
        };
        beforeEach(() => {
            audioCollection = {
                doc: jest.fn((id: string) => audio)
            };
            audioService = new AudioService(audioCollection);
        });

        it("calls collection's get() with an id", async () => {
            const id: string = 'm12lkj09ulkjfd';
            const audioDoc = await audioService.getAudio(id);
            expect(audioDoc).toEqual(audio);
            expect(audioCollection.doc).toHaveBeenCalledWith(id);
        });
    });

    describe("#deleteAudio", () => {
        it('calls delete() on the firestore document', async () => {
            const deleteFn = jest.fn();
            const collection = {
                doc: jest.fn((id) => ({
                    delete: deleteFn
                }))
            };
            const audio = {
                id: '1'
            };
            const service = new AudioService(collection);
            await service.deleteAudio(audio);
            expect(collection.doc).toHaveBeenCalledWith(audio.id);
            expect(deleteFn).toHaveBeenCalled();
        });
    });
});
