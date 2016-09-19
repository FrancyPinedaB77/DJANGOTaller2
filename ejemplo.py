input =  open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\salida.txt","r")
output = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\myjson.txt","w")

for line in input:
    x = line.split(",")

    print(x[0], "nacio", x[2])
