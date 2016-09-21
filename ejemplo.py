import csv
import json
input =  open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\datos.csv","r")
output = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\myjson.json","w")

for line in input:
    x = line.split(",")
    print (x[0],"nacio", x[1],x[2])

