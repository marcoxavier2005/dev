
/**
*'Macro iniciada em 07/09/2000
*'Autor : Geraldo Passos Amorim
*'Transforma��o de Coordenadas Geod�sicas em Coordeandas UTM
*'C�lculo de Coordeandas UTM em Coordeandas Geod�sicas
*/
// foi feita substitui��o da fun��o fix() por Math.ceil() na linha 349
// foi inserido ajuste na fun��o Math.truc() entre as linhas 53 e 63

var sessenta = 60;
var trezentossenta = 360;
var centoitenta = 180;
var trintaseis = 36;
var cem = 100;
var seismiles = 0.006;
var acerto = 0.0000000000001;
var RadSeg = 206264.8063;


/**
**** exemplo ****************
var x = myfunction(4, 3);   // function is called, return value will end up in x

function myfunction(a, b) {
  return a * b;             // function returns the product of a and b
}

if (time < 10) {
  greeting = "Good morning";
} else if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}


var x = "0";
switch (x) {
  case 0:
    text = "Off";
    break;
  case 1:
    text = "On";
    break;
  default:
    text = "No value found";
}

****
*/

// substitui a fun��o Math.trunc()
Math.trunc = Math.trunc || function(x) {
  if (isNaN(x)) {
    return NaN;
  }
  if (x > 0) {
    return Math.floor(x);
  }
  return Math.ceil(x);
};
/**
MsDeg = MsDeg || function(x){
  if (isNaN(x)) {
    return NaN;
  } else {
    return MsDeg(x);
  }
}
*/


// 'Tranforma o angulo: de radianos para Graus 

function RadGraus(ang) {
  Graus = ang * centoitenta / Math.PI;
    if (Graus > trezentossenta){
      return Graus - trezentossenta;
    }else{
      return Graus;
    }

}

//'Transforma angulo : de Graus Decimais para Graus:Minutos:Segundos
 
function GMS(graud) {
  graud = graud;
  Grau = Math.trunc(graud);
  minutos = (graud - Grau) * sessenta;
  segundos = (minutos - Math.trunc(minutos)) * seismiles;
  return Grau + (Math.trunc(minutos)) / cem + segundos;
  
}

// 'Transforma �ngulo de graus,minutos e segundos para graus decimais

function MsDeg(graums) {
  if (graums >= 0) {
    graums = graums + acerto;
  }else{
    graums = graums - acerto;
  }
  graum = (graums - Math.trunc(graums)) * cem;
  if (graum >= 0) {
    graum = graum + acerto;
  } else {
    graum = graum - acerto;
  }
  return Math.trunc(graums) + (Math.trunc(graum) / sessenta + (graum - Math.trunc(graum)) / trintaseis); // alterado o nome da vari�vel
}

// 'Transforma graus decimais em radianos

function DegRad(graurad) {
  return graurad * Math.PI / centoitenta;

}

// 'C�lculo de Azimute a partir de Dois Pares de Coordenadas

function azimute(abcisAnterior, ordenAnterior, AbcisPosterior, OrdenPosterior){
  deltaX = AbcisPosterior - abcisAnterior;
  deltaY = OrdenPosterior - ordenAnterior;
  angulo = Math.atan2(deltaY, deltaX);
  if (deltaX >= 0){
    azimute = RadGraus(angulo);
  }else{
    azimute = RadGraus(angulo) + trezentossenta;
  }
  return azimute = GMS(azimute);

}

// 'Calculo da dist�ncia entre dois pares de Coordenadas

function Distancia(abcisAnterior, ordenAnterior, AbcisPosterior, OrdenPosterior){
  deltaX = AbcisPosterior - abcisAnterior;
  deltaY = OrdenPosterior - ordenAnterior;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY,2));

}

//'Calculo de Coordenadas - Abcissa

function AbcisPosterior(abcisAnterior, Distancia, azimute){
    azimuth = MsDeg(azimute);
    azimut = DegRad(azimuth);
    return abcisAnterior + Distancia * Math.sin(azimut);

}

// 'Calculo de Coordenadas - Ordenada

function OrdenPosterior(ordenAnterior, Distancia, azimute){
  azimuth = MsDeg(azimute);
  azimuth = DegRad(azimuth);
  return ordenAnterior + Distancia * Math.cos(azimuth);

}

// 'Determina��o do Semi-Eixo Maior do Elips�ide

function SemiEixoMaior(Elipsoide){
//  Elipsoide = Elipsoide;
  switch (Elipsoide) {
      
    //'Semi-Eixo Maior do Sad-69
    case 1:
    return 6378160;
    break;
      
    //'Semi-Eixo Maior do C�rrego Alegre  
    case 2:
    return 6378388;
    break;
      
    //'Semi-Eixo Maior do WGS-84  
    case 3:
    return 6378137;
    break;
      
    //'Semi-Eixo Maior do WGS-72
    case 4:
    return 6378135;
  }
}


//'Determina��o do Semi-Eixo Menor do Elips�ide

function SemiEixoMenor(Elipsoide){
  //Elipsoide = Elipsoide;
  switch (Elipsoide){
   case 1:             //'Semi-Eixo Menor do Sad-69
     return 6356774.719;
     break;   
   case 2:             //'Semi-Eixo Menor do C.Alegre
     return 6356911.946;
     break;           
   case 3:              //'Semi-Eixo Menor do WGS-84
     return 6356752.314;
     break;      
   case 4:              //'Semi-Eixo Menor do WGS-72
     return 6356750.52;
  }
}


 //'Excentricidade do Elipsoide

function Excentricidade(Elipsoide){
  a = SemiEixoMaior(Elipsoide);
  b = SemiEixoMenor(Elipsoide);
  return Math.sqrt(Math.pow(a,2) - Math.pow(b, 2)) / a;
     
}


//'Segunda Excentricidade do Elipsoide

function SegExcen(Elipsoide){
   a = SemiEixoMaior(Elipsoide);
   b = SemiEixoMenor(Elipsoide);
   return Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2)) / b;
     
}


// 'Achatamento
 
function Achatamento(Elipsoide){
   a = SemiEixoMaior(Elipsoide);
   b = SemiEixoMenor(Elipsoide);
   return (a - b) / a;
   
}

// 'Raio da Se��o Grande Normal(Se��o Primeiro Vertical)

function RaioNormal(Elipsoide, Latitude){
   Latitude = DegRad(MsDeg(Latitude));
   a = SemiEixoMaior(Elipsoide);
   b = SemiEixoMenor(Elipsoide);
   e = Excentricidade(Elipsoide);
   return a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(Latitude),2));
      
}

// 'Raio da Se��o Meridiana (Meridiano Local)

function RaioMeridiano(Elipsoide, Latitude){
   Latitude = DegRad(MsDeg(Latitude));
   a = SemiEixoMaior(Elipsoide);
   b = SemiEixoMenor(Elipsoide);
   e = Excentricidade(Elipsoide);
   return a * (1 - Math.pow(e,2)) / (1 - Math.pow(e,2) * Math.pow(Math.pow(Math.sin(Latitude),2)),(3 / 2));
      
}


// 'Raio M�dio da Grande Normal e a Meridiana Local

function RaioMedio(Elipsoide, Latitude){
   Latitude = DegRad(MsDeg(Latitude));
   a = SemiEixoMaior(Elipsoide);
   b = SemiEixoMenor(Elipsoide);
   e = Excentricidade(Elipsoide);
   M = a * (1 - Math.pow(e,2)) / (1 - Math.pow(e,2) * Math.pow(Math.pow(Math.sin(Latitude),2)),(3 / 2));
   N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(Latitude),2));
   return Math.sqrt(M * N);
     
}


//'C�lculo de A, B, C, D, E, F

//'Calculo do coeficiente A

function AI(Elipsoide){
   e = Excentricidade(Elipsoide);
   return 1 + 3 / 4 * Math.pow(e,2) + 45 / 64 * Math.pow(e,4) + 175 / 256 * Math.pow(e,6) + 11025 / 16384 * Math.pow(e,8) + 43659 / 65536 * Math.pow(e,10);
   
}

 //'C�lculo do coeficiente B

function BI(Elipsoide){
  e = Excentricidade(Elipsoide);
  return 3 / 4 * Math.pow(e,2) + 15 / 16 * Math.pow(e,4) + 525 / 512 * Math.pow(e,6) + 2205 / 2048 * Math.pow(e,8) + 72765 / 65536 * Math.pow(e,10);
   
}

// 'C�lculo do coeficiente C

 function CI(Elipsoide){
   e = Excentricidade(Elipsoide);
   return 15 / 64 * Math.pow(e,4) + 105 / 256 * Math.pow(e,6) + 2205 / 4096 * Math.pow(e,8) + 10395 / 16384 * Math.pow(e,10);
   
}

// 'Calculo do coeficiente D

function DI(Elipsoide){
   e = Excentricidade(Elipsoide);
   return 35 / 512 * Math.pow(e,6) + 315 / 2048 * Math.pow(e,8) + 31185 / 131072 * Math.pow(e,10);
   
}

// 'Calculo do coeficiente E

function EI(Elipsoide){
   e = Excentricidade(Elipsoide);
   return 315 / 16384 * Math.pow(e,8) + 3465 / 65536 * Math.pow(e,10);

}


// 'Calculo do coeficiente F

function FI(Elipsoide){
   e = Excentricidade(Elipsoide);
   return 639 / 131072 * Math.pow(e,10);
   
}

// 'Calculo de S - Arco Meridiano contado a patir do Equador sobre o Meridiano Central

function S(Elipsoide, Latitude){
   LatRad = DegRad(MsDeg(Latitude));
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   return a * (1 - Math.pow(e,2)) * (AI(Elipsoide) * LatRad - 1 / 2 * BI(Elipsoide) * Math.sin(2 * LatRad) + 1 / 4 * CI(Elipsoide) * Math.sin(4 * LatRad) - 1 / 6 * DI(Elipsoide) * Math.sin(6 * LatRad) + 1 / 8 * EI(Elipsoide) * Math.sin(8 * LatRad) - 1 / 10 * FI(Elipsoide) * Math.sin(10 * LatRad));

}

// 'Calculo do Fator de Escala no Meridiano Central (K0)

function K0(){
     
  return 1 - (1 / 2500);
 
}

// 'Calculo do meridiano Central Meridiano Central (MeridCentral)
// substituido a fun��o fix() maior inteiro negativo pela fun��o Math.ceil()

function MeridCentral(Longitude){
  meridcentral = Math.ceil(Longitude / 6);
  if (Longitude >= 0) {
    return meridcentral * 6 + 3;
  }else{
    return meridcentral * 6 - 3;
  }

}

// 'Calculo do P (Diferen�a entre o Meridiano Local e o Meridiano Central

function PSeg(Longitude){
  LongGraus = MsDeg(Longitude);
  return (LongGraus - MeridCentral(LongGraus)) * 3600 * 0.0001;

}

// 'Calculo da Tabela I (IBGE)

function TabI(Elipsoide, Latitude){
  return S(Elipsoide, Latitude) * K0();
   
}

 //'Calculo da Tabela II (IBGE)

 function TabII(Elipsoide, Latitude){
   LatRad = DegRad(MsDeg(Latitude));
   senlat = Math.sin(LatRad);
   CosLat = Math.cos(LatRad);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(LatRad),2));
   return N * senlat * CosLat / (2 * Math.pow(RadSeg,2)) * K0() * Math.pow(10,8);
   
}

 //'Calculo da Tabela III (IBGE)

function TabIII(Elipsoide, Latitude){
  LatRad = DegRad(MsDeg(Latitude));
  senlat = Math.sin(LatRad);
  CosLat = Math.cos(LatRad);
  TanLat = Math.tan(LatRad);
  a = SemiEixoMaior(Elipsoide);
  e = Excentricidade(Elipsoide);
  e2 = SegExcen(Elipsoide);
  N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(LatRad),2))
  return N * senlat * Math.pow(CosLat,3) / (24 * Math.pow(RadSeg,4)) * (5 - Math.pow(TanLat,2) + 9 * Math.pow(e2,2) * Math.pow(CosLat,2) + 4 * Math.pow(e2,4) * Math.pow(CosLat,4)) * K0() * Math.pow(10,16);
   
}

 //'C�lculo da Tabela A6 (A'6 - IBGE)

function TabA6(Elipsoide, Latitude){
   
  LatRad = DegRad(MsDeg(Latitude));
  senlat = Math.sin(LatRad);
  CosLat = Math.cos(LatRad);
  TanLat = Math.tan(LatRad);
  a = SemiEixoMaior(Elipsoide);
  e = Excentricidade(Elipsoide);
  e2 = SegExcen(Elipsoide);
  N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(LatRad),2));
  return N * senlat * Math.pow(CosLat,5) / (720 * Math.pow(RadSeg,6)) * (61 - 58 * Math.pow(TanLat,2) + Math.pow(TanLat,4) + 270 * Math.pow(e2,2) * Math.pow(CosLat,2) - 330 * Math.pow(e2,2) * Math.pow(senlat,2)) * K0() * Math.pow(10,24);

}
  
//  'Calculo da Coordenada Norte
  
function Norte(Elipsoide, Latitude, Longitude){
  P = PSeg(Longitude);
  I = TabI(Elipsoide, Latitude);
  II = TabII(Elipsoide, Latitude);
  III = TabIII(Elipsoide, Latitude);
  A6 = TabA6(Elipsoide, Latitude);
  Norte1 = I + II * Math.pow(P,2) + III * Math.pow(P,4) + A6 * Math.pow(P,6);
  if (Norte1 < 0){
    return 10000000 + Norte1; //'Hemisf�rio Sul
  }else{
    return Norte1;   //'Hemisf�rio Norte
  }
}

//'C�lculo da Tabela IV (IBGE)

function TabIV(Elipsoide, Latitude){
   LatMsDeg = MsDeg(Latitude);// inserida para ver se funciona o msdeg
   LatRad = DegRad(LatMsDeg);
   senlat = Math.sin(LatRad);
   CosLat = Math.cos(LatRad);
   TanLat = Math.tan(LatRad);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(LatRad),2));

   return (N * CosLat / RadSeg) * K0() * Math.pow(10,4);

}

// 'C�lculo da Tabela V (IBGE)

 function TabV(Elipsoide, Latitude) {
  
   LatRad = DegRad(MsDeg(Latitude));
   senlat = Math.sin(LatRad);
   CosLat = Math.cos(LatRad);
   TanLat = Math.tan(LatRad);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   N = a / Math.sqrt(1 - Math.pow(e,2) * Math.pow(Math.sin(LatRad),2));

   return (N * Math.pow(CosLat,3) / (6 * Math.pow(RadSeg,3)) * (1 - Math.pow(TanLat, 2) + Math.pow(e2, 2) * Math.pow(CosLat, 2))) * K0() * Math.pow(10, 12);

}

// 'C�lculo da Tabela B5 (B'5 - IBGE)

 function TabB5(Elipsoide, Latitude){
   
   LatRad = DegRad(MsDeg(Latitude));
   senlat = Math.sin(LatRad);
   CosLat = Math.cos(LatRad);
   TanLat = Math.tan(LatRad);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   N = a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(LatRad), 2));

   return N * Math.pow(CosLat,5) / (120 * Math.pow(RadSeg, 5)) * (5 - 18 * Math.pow(TanLat, 2) + Math.pow(TanLat, 4) + 14 * Math.pow(e2, 2) * Math.pow(CosLat, 2) - 58 * Math.pow(e2, 2) * Math.pow(senlat, 2)) * K0() * Math.pow(10, 20);

}

// 'Calculo da Coordenada Este (Deslocada a Este de 500.000m)
  
function Este(Elipsoide, Latitude, Longitude){
     P = PSeg(Longitude);
     IV = TabIV(Elipsoide, Latitude);
     V = TabV(Elipsoide, Latitude);
     B5 = TabB5(Elipsoide, Latitude);
     
     return IV * P + V * Math.pow(P, 3) + B5 * Math.pow(P, 5) + 500000;
      
}

// 'C�lculo da Tabela VII (IBGE)

function TabBVII(Elipsoide, Latitude){
   
   LatRad = DegRad(MsDeg(Latitude));
   senlat = Math.sin(LatRad);
   CosLat = Math.cos(LatRad);
   TanLat = Math.tan(LatRad);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   N = a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(LatRad), 2));

   return TanLat / (2 * Math.pow(N, 2) * RadSeg) * (1 + Math.pow(e2, 2) * Math.pow(CosLat, 2)) * 1 / Math.pow(K0(), 2) * Math.pow(10, 12);

}

// 'C�lculo do arco de Meridiano (isento do Fator de Escala) at� a Latitude LatQ no Meridiano
// 'Central que � numericamente igual ao arco de meridiano at� Latitude procurada no meridiano
// 'procurado

function ArcoLat(Hemisferio, UtmNorte){
  Hemisferio = Hemisferio.toString();
  switch (Hemisferio) {
    case "S":
      return (UtmNorte - 10000000) / K0();
      break;
    case "N":
      return UtmNorte / K0();
  }

}

//'Calculo do arco Equatorial (isento do Fator de Escala) entre o Meridiano Central e o Meridiano
//'procurado

function ArcoLong(UtmEste){
  return (UtmEste - 500000) / K0();
   
}


//'Calculo do �ngulo Central (W1) em radiano do esfer�ide(Latitude Geocentrica) de raio igual
//'ao Semi eixo maior do Elips�ide

function GeoW1(Elipsoide, Hemisferio, UtmNorte){
  Hemisferio = Hemisferio.toString();
  ArcLat = ArcoLat(Hemisferio, UtmNorte);
  a = SemiEixoMaior(Elipsoide);
  return ArcLat / a;
   
}

//'C�lculo da Latitude Q1 no Elips�ide a partir da latitude geoc�ntrica GeoW1

function LatQ1(Elipsoide, Hemisferio, UtmNorte){
  Hemisferio = Hemisferio.toString();
  W1 = GeoW1(Elipsoide, Hemisferio, UtmNorte);
  e = Excentricidade(Elipsoide);
  return Math.atan(Math.tan(W1) / (1 - Math.pow(e, 2)));
   
}

//'Calculo do Raio Meridiano para a Latitude Q1

function MQ1(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   Q1 = LatQ1(Elipsoide, Hemisferio, UtmNorte);
   return a * (1 - Math.pow(e, 2)) / Math.pow((1 - Math.pow(e, 2) * Math.pow(Math.sin(Q1), 2)), (3 / 2));

}
 
 //'C�lculo do arco Meridiano para a Latitude Q1

function SLatQ1(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   LatRad = LatQ1(Elipsoide, Hemisferio, UtmNorte);
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   return a * (1 - Math.pow(e, 2)) * (AI(Elipsoide) * LatRad - 1 / 2 * BI(Elipsoide) * Math.sin(2 * LatRad) + 1 / 4 * CI(Elipsoide) * Math.sin(4 * LatRad) - 1 / 6 * DI(Elipsoide) * Math.sin(6 * LatRad) + 1 / 8 * EI(Elipsoide) * Math.sin(8 * LatRad) - 1 / 10 * FI(Elipsoide) * Math.sin(10 * LatRad));
      
}


//'Calculo de DeltaQ

function DeltaLatQ(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   ArcLat = ArcoLat(Hemisferio, UtmNorte);
   SQ1 = SLatQ1(Elipsoide, Hemisferio, UtmNorte);
   MQ11 = MQ1(Elipsoide, Hemisferio, UtmNorte);
   return (ArcLat - SQ1) / MQ11;

}
//'Latitude Q1 + Delta
function LatQi(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   DeltLatQ = DeltaLatQ(Elipsoide, Hemisferio, UtmNorte);
   LatiQ1 = LatQ1(Elipsoide, Hemisferio, UtmNorte);
   return LatiQ1 + DeltLatQ;

}

//'Calculo do Raio Normal para a Latitude Qi

function NQi(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   a = SemiEixoMaior(Elipsoide);
   e = Excentricidade(Elipsoide);
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   return a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(Qi), 2));

}

//'C�lculo de De T.Adm

function TAdm(Elipsoide, Hemisferio, UtmNorte, UtmEste){
  Hemisferio = Hemisferio.toString();  
  Arclong = ArcoLong(UtmEste);
  NQii = NQi(Elipsoide, Hemisferio, UtmNorte);
  return Math.pow(Arclong, 2) / (2 * Math.pow(NQii, 2));
  
}

//'Calculo de T.Q

function TQ(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   TanQi = Math.tan(Qi);
   CosQi = Math.cos(Qi);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   ni = Math.pow(e2, 2) * Math.pow(CosQi, 2);  //'Ni ao Quadrado
   return -5 - 3 * (Math.pow(TanQi, 2) + ni * (2 * (1 - Math.pow(TanQi, 2)) - ni * (1 + 3 * Math.pow(TanQi, 2))));
       
}

//'Calculo de T.Ad

function TAd(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   TanQi = Math.tan(Qi);
   CosQi = Math.cos(Qi);
   e = Excentricidade(Elipsoide);
   e2 = SegExcen(Elipsoide);
   ni = Math.pow(e2, 2) * Math.pow(CosQi, 2);
   return 61 + 107 * ni + 9 * Math.pow(TanQi, 2) * (2 * (5 - 9 * ni) + 5 * Math.pow(TanQi, 2) * (1 - ni));
   
}

//'Calculo de T.T

function TT(Elipsoide, Hemisferio, UtmNorte){
   Hemisferio = Hemisferio.toString();
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   TanQi = Math.tan(Qi);
   e2 = SegExcen(Elipsoide);
   ni = Math.pow(e2, 2) * Math.pow(Math.cos(Qi), 2);
   return 5 + 4 * Math.pow(TanQi, 2) * (7 + 6 * Math.pow(TanQi, 2)) + 2 * ni * (3 + 4 * Math.pow(TanQi, 2));
   
}

//'C�lculo da Latitude em graus Minutos e ssegundos

function LatGms(Elipsoide, Hemisferio, UtmNorte, UtmEste){
   Hemisferio = Hemisferio.toString();
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   TanQi = Math.tan(Qi);
   e2 = SegExcen(Elipsoide);
   ni = Math.pow(e2, 2) * Math.pow(Math.cos(Qi), 2);
   TAdmQi = TAdm(Elipsoide, Hemisferio, UtmNorte, UtmEste);
   TQQi = TQ(Elipsoide, Hemisferio, UtmNorte);
   TAdQi = TAd(Elipsoide, Hemisferio, UtmNorte);
   LatRad = Qi - TAdmQi * TanQi * (1 + ni + (TAdmQi / 6) * (TQQi + TAdmQi / 15 * TAdQi));
   //return GMS(RadGraus(LatRad));
   return RadGraus(LatRad);
 
}


//'C�lculo da Longitude em graus Minutos e Segundos

function LongGms(Elipsoide, Hemisferio, MeridianoCentral, UtmNorte, UtmEste) {
   Hemisferio = Hemisferio.toString();
   Qi = LatQi(Elipsoide, Hemisferio, UtmNorte);
   TanQi = Math.tan(Qi);
   e2 = SegExcen(Elipsoide);
   ni = Math.pow(e2, 2) * Math.pow(Math.cos(Qi), 2);
   Arclong = ArcoLong(UtmEste);
   NQii = NQi(Elipsoide, Hemisferio, UtmNorte);
   TAdmQi = TAdm(Elipsoide, Hemisferio, UtmNorte, UtmEste);
   TQQi = TQ(Elipsoide, Hemisferio, UtmNorte);
   TAdQi = TAd(Elipsoide, Hemisferio, UtmNorte);
   TTQi = TT(Elipsoide, Hemisferio, UtmNorte);
   DtaLong = RadGraus(Arclong / (NQii * Math.cos(Qi)) * (1 + TAdmQi / 3 * (TAdmQi / 10 * TTQi - 1 - 2 * Math.pow(TanQi, 2) - ni)));
   
//   return GMS(MeridianoCentral + DtaLong);
   return MeridianoCentral + DtaLong;
};