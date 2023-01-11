import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');
  const [sound, setSound] = React.useState();
  
  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setTela('jogo');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
      case 'trap':
      return getTelaTrap();
     
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //LINHAS
    if(tabuleiro[linha][0] !== '' &&
        tabuleiro[linha][0] === tabuleiro[linha][1] &&
        tabuleiro[linha][1] === tabuleiro[linha][2]
    ) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    //COLUNAS
    if(tabuleiro[0][coluna] !== '' &&
        tabuleiro[0][coluna] === tabuleiro[1][coluna] &&
        tabuleiro[1][coluna] === tabuleiro[2][coluna]
    ) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //DIAGONAL 1
    if(tabuleiro[0][0] !== '' &&
        tabuleiro[0][0] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][2]
    ) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    //DIAGONAL 2
    if(tabuleiro[0][2] !== '' &&
        tabuleiro[0][2] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][0]
    ) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //EMPATE
    if(jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }

    //JOGO CONTINUA
    setJogadasRestantes(jogadasRestantes - 1);
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  function getTelaMenu() {
    playSound = async () => {
    await Audio.Sound.createAsync({ uri:'../assets/videoplayback.mp3'}, { shouldPlay: true }
    );
    }
    return (
        <View style={styles.container}>
           <TouchableOpacity
              style={styles.botaoMenu2}
              onPress={()=>{this.playSound(); setTela(trap)}}
          >
            <Text style={styles.textBotaoMenu}>‎ </Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
          <Image style={{width: 300, height: 250}} source={{uri: 'https://i.pinimg.com/originals/11/ad/48/11ad486604ba6802ffe7cda95ce1f528.gif'}} />
          <Text style={styles.titulo}>\Pato The Game/</Text>
          //Davizikn\\
          <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

          <View style={styles.inlineItems}>
            <TouchableOpacity
                style={styles.boxJogador}
                onPress={() => iniciarJogo('X')}
            >
              <Text style={styles.jogadorX}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.boxJogador}
                onPress={() => iniciarJogo('O')}
            >
              <Text style={styles.jogadorO}>O</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }

  function getTelaJogo() {
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
              <Image style={{width: 300, height: 250}} source={{uri: 'https://media.tenor.com/6UD8rdj9ixcAAAAC/pato-dan%C3%A7ando-duck.gif'}} />
          <Text style={styles.titulo}>Pato The Game</Text>
          {
            tabuleiro.map((linha, numeroLinha) => {
              return(
                  <View key={numeroLinha} style={styles.inlineItems}>
                    {
                      linha.map((coluna, numeroColuna) => {
                        return(
                          <TouchableOpacity
                              key={numeroColuna}
                              style={styles.boxJogador}
                              onPress={() => jogar(numeroLinha, numeroColuna)}
                              disabled={coluna !== ''}
                          >
                            <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO }>{coluna}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
              )
            })
          }
          <TouchableOpacity
              style={styles.botaoMenu}
              onPress={() => setTela('menu')}
          >
            <Text style={styles.textBotaoMenu}>Volta ao menu</Text>
          </TouchableOpacity>
        </View>
    );
  }

  function getTelaGanhador() {
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
             <Image style={{width: 300, height: 250}} source={{uri: 'https://media.tenor.com/yTHoLS82szwAAAAC/pato-girando.gif'}} />
          <Text style={styles.titulo}>Pato The Game</Text>
          <Text style={styles.subtitulo}>Resultado final</Text>

          {
            ganhador === '' &&
                <Text style={styles.ganhador}>Nenhum ganhador</Text>
          }

          {
            ganhador !== '' &&
                <>
                  <Text style={styles.ganhador}>Ganhador</Text>
                  <View style={styles.boxJogador}>
                    <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO }>{ganhador}</Text>
                  </View>
                </>
          }

          <TouchableOpacity
              style={styles.botaoMenu}
              onPress={() => setTela('menu')}
          >
            <Text style={styles.textBotaoMenu}>Volta ao menu</Text>
          </TouchableOpacity>
        </View>
    );
  }
 function getTelaTrap(){
  return (
    <View style={styles.container}>
<Image style={{width: 300, height: 250}} source={{uri: 'https://media.tenor.com/yTHoLS82szwAAAAC/pato-girando.gif'}} />
<Image style={{width: 300, height: 250}} source={{uri: 'https://media.tenor.com/yTHoLS82szwAAAAC/pato-girando.gif'}} />
  }
 </View>           
  );
    
  }
}    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '	#000000',
  },

  subtitulo: {
    fontSize: 20,
    color: '#000000',
    marginTop: 20,
  },

  inlineItems: {
    flexDirection: 'row',
  },

  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: "#1E90FF",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  jogadorX: {
    fontSize: 40,
    color: '#191970',
  },

  jogadorO: {
    fontSize: 40,
    color: '#191970',
  },

  botaoMenu: {
    marginTop: 20,
  },

  textBotaoMenu: {
    color: '#000000',
  },

  ganhador: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
});
