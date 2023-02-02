#!/usr/bin/env python
''' Converts ASCII Hex String into Binary File'''
import binascii
import sys

def main():
    file_name = None
    try:
        file_name = sys.argv[1]
    except:
        print("wrong number of arguments or invalid arguments")

    lines = []
    with open(file_name) as f:
        lines = f.readlines()

    #print(lines[0])
    binary = binascii.unhexlify(lines[0])
    with open('midi_hex.mid','wb') as f:
        f.write(binary)

if __name__ == "__main__":
    main()