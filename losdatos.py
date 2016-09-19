#!/usr/bin/env python
import json
print("un texto ")
n=1
p=3
print (n+p)
file = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\salida.txt","r")
d={}
for line in file:
    x = line.split(",")
    print(x[0],"nacio",x[2])



    # print (x[0],'\n',x[1])
    #print ({x[0],x[1]})

    #print (x[0],'\t',x[1])


