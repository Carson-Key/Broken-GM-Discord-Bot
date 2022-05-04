import sys
import os
import speech_recognition as sr
from pydub import AudioSegment
import wave

def convert_pcm_to_wav(path):
    new_path = path.replace('.pcm','.wav')
    with open(path, 'rb') as pcmfile:
        pcmdata = pcmfile.read()
    with wave.open(new_path, 'wb') as wavfile:
        wavfile.setparams((2, 2, 44100, 0, 'NONE', 'NONE'))
        wavfile.writeframes(pcmdata)
    os.remove(path)
    return new_path

def convert_ogg_to_wav(path):
    new_path = path.replace('.ogg','.wav')
    ogg_to_wav = AudioSegment.from_file(path)
    ogg_to_wav.export(new_path, format='wav')
    os.remove(path)
    return new_path

if __name__ == "__main__":
    new_path = convert_ogg_to_wav(sys.argv[1])
    r = sr.Recognizer()
    to_transcribe = sr.AudioFile(new_path)
    try:
        with to_transcribe as source:
            # r.adjust_for_ambient_noise(source)
            audio = r.record(source)
            MyText = r.recognize_google(audio, language="EN")
            print(MyText, end = "")
    except:
        print("Failed to Recognize Speech", end = "")
    os.remove(new_path)