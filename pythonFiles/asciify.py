from PIL import Image
import os
import sys

def returnAscii(brightness):
    asciiChart = {
        0: '.',
        24: ',',
        45: '-',
        66: ':',
        87: ';',
        108:'+',
        129:'*',
        150:'?',
        171:'%',
        192:'S',
        213:'#',
        234: '@'
    }

    if brightness >= 234:
        return asciiChart[234]
    elif brightness >= 213:
        return asciiChart[213]
    elif brightness >= 192:
        return asciiChart[192]
    elif brightness >= 171:
        return asciiChart[171]
    elif brightness >= 150:
        return asciiChart[150]
    elif brightness >= 129:
        return asciiChart[129]
    elif brightness >= 108:
        return asciiChart[108]
    elif brightness >= 87:
        return asciiChart[87]
    elif brightness >= 66:
        return asciiChart[66]
    elif brightness >= 45:
        return asciiChart[45]
    elif brightness >= 24:
        return asciiChart[24]
    else:
        return asciiChart[0]


def main(img, size):
    #take image input
    im = Image.open(img)

    small = (60,100)
    medium = (150,225)
    large = (300,400)

    if size == 'small':
        rsize = small
    elif size == 'medium':
        rsize = medium
    elif size == 'large':
        rsize = large

    im.thumbnail(rsize,Image.ANTIALIAS)
    im.convert('RGB')
    width, height = im.size

    arrayOfAscii = [ [ None for i in range(width) ] for j in range(height) ]
    for x in range(width):
        for y in range(height):
            pixelValues = im.getpixel((x,y))
            R = pixelValues[0] ; G = pixelValues[1] ; B = pixelValues[2]
            #using a formula to determine brightness of pixel
            brightness = sum([R,G,B])/ 3
            arrayOfAscii[y][x] = returnAscii(brightness)

    #output values to txt file
    with open(os.path.join('pythonFiles','output.txt'),'w+') as outfile:
        for row in arrayOfAscii:
            outfile.write(''.join(row)+'\n')

if __name__ == '__main__':
    main(sys.argv[1],sys.argv[2])
    print('python script executed successfully')
