#input =  open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\salida.txt","r")
#output = open("C:\\Users\\ASUS\\Desktop\\Downloads\\Taller1BigData-master\\Taller1BigData-master\\static\\js\\myjson.txt","w")

#for line in input:
#    x = line.split(",")

 #   print(x[0],x[1])
  #  print ("{","name:",x[0],"children:[", "fecha",x[1],"pais",x[2],"},")


import csv
import json
  
# Open the CSV  
f = open( 'C:\Users\ASUS\Desktop\Downloads\Taller1BigData-master\Taller1BigData-master\static\js\datos.csv', 'rU' )
# Change each fieldname to the appropriate field name. I know, so difficult.  
reader = csv.DictReader( f, fieldnames = ( "fieldname0","fieldname1","fieldname2" ))  
# Parse the CSV into JSON  
out = json.dumps( [ row for row in reader ] )  
print "JSON parsed!"  
# Save the JSON  
f = open( 'C:\Users\ASUS\Desktop\Downloads\Taller1BigData-master\Taller1BigData-master\static\js\myjson.json', 'w')  
f.write(out)  
print "JSON saved!"  
