import { AudioService } from './AudioService';
import { Audio } from '../model/audio';

describe('AudioService', () => {
    let audioService: AudioService;
    let audioCollection: any;
    beforeEach(() => {
        audioCollection = {};
        audioService = new AudioService(audioCollection);
    });

    it('is created successfully', () => {
        expect(audioService).toBeTruthy();
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
});
