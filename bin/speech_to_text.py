import sys
import os
# import speech_recognition as sr
import wave

def convert_pcm_to_wav(path):
    with open(path, 'rb') as pcmfile:
        pcmdata = pcmfile.read()
    with wave.open(path+'.wav', 'wb') as wavfile:
        wavfile.setparams((2, 2, 44100, 0, 'NONE', 'NONE'))
        wavfile.writeframes(pcmdata)

if __name__ == "__main__":
    convert_pcm_to_wav(sys.argv[1])
    # r = sr.Recognizer()
    # to_transcribe = sr.AudioFile(sys.argv[1])
    # with to_transcribe as source:
    #     r.adjust_for_ambient_noise(source)
    #     audio = r.record(source)
    #     MyText = r.recognize_google(audio)
    #     print("Did you say " + MyText)
    #     # os.remove(sys.argv[1])