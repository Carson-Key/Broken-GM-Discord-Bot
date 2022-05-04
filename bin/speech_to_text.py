import sys
import os
import speech_recognition as sr
from pydub import AudioSegment

def convert_pcm_to_wav(path):
    new_path = path.replace('.ogg','.wav')
    ogg_to_wav = AudioSegment.from_file(path)
    ogg_to_wav.export(new_path, format='wav')
    os.remove(path)
    return new_path

if __name__ == "__main__":
    new_path = convert_pcm_to_wav(sys.argv[1])
    r = sr.Recognizer()
    to_transcribe = sr.AudioFile(new_path)
    with to_transcribe as source:
        # r.adjust_for_ambient_noise(source)
        audio = r.record(source)
        MyText = r.recognize_google(audio)
        print(MyText, end = "")
    os.remove(new_path)