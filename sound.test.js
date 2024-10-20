import { jest } from '@jest/globals';
import SoundPlayer from './sound-player';

const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});


test('it does not work either', async () => {
  const mod = await import('./sound-player-consumer');
  const consumer = new mod.default();
  consumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalled();
});
