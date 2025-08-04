import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [news] = useState([
    {
      id: 1,
      title: 'Открытие сервера Miami RP',
      content: 'Добро пожаловать на лучший RP сервер GTA 5! Уникальные возможности ждут вас.',
      date: '4 августа 2025',
      image: '/img/f7b9321e-5f12-4218-8e31-4d31e2165038.jpg'
    },
    {
      id: 2,
      title: 'Обновление экономики',
      content: 'Новые возможности заработка и улучшенная система бизнеса на сервере.',
      date: '3 августа 2025',
      image: ''
    }
  ]);

  const startGame = () => {
    window.open('fivem://connect/miami-rp.ru', '_blank');
  };

  const donate = () => {
    window.location.href = '/donate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url('/img/f7b9321e-5f12-4218-8e31-4d31e2165038.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <Badge className="mb-4 text-lg px-4 py-2 bg-primary/20 text-primary border-primary">
              GTA 5 ROLEPLAY
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-6 animate-fade-in">
            MIAMI <span className="text-primary">RP</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Погрузись в мир роскоши и возможностей. Лучший RP-сервер с уникальной экономикой и захватывающим геймплеем.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-primary hover:bg-primary/80 text-white font-semibold"
              onClick={startGame}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Начать играть
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-secondary text-secondary hover:bg-secondary hover:text-dark"
              onClick={donate}
            >
              <Icon name="CreditCard" size={20} className="mr-2" />
              Донат
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-white text-center mb-12">
            Почему выбирают нас?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gamepad2" size={32} className="text-primary" />
                </div>
                <CardTitle className="font-heading text-white">Уникальный геймплей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Авторские скрипты, системы бизнеса и множество активностей для незабываемого опыта.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-secondary/20 hover:border-secondary/50 transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="DollarSign" size={32} className="text-secondary" />
                </div>
                <CardTitle className="font-heading text-white">Честная экономика</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Сбалансированная система заработка без доната на выживание.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-accent/20 hover:border-accent/50 transition-all duration-300 animate-fade-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-accent" />
                </div>
                <CardTitle className="font-heading text-white">Качественная модерация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Опытная команда администраторов следит за порядком 24/7.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-white text-center mb-12">
            Последние новости
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {news.slice(0, 4).map((item) => (
              <Card key={item.id} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 animate-fade-in overflow-hidden">
                {item.image && (
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-heading text-white">{item.title}</CardTitle>
                    <Badge variant="outline">{item.date}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-white mb-6">
            Готов начать приключение?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Присоединяйся к тысячам игроков уже сегодня!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-primary hover:bg-primary/80 text-white font-semibold"
              onClick={startGame}
            >
              <Icon name="Download" size={20} className="mr-2" />
              Подключиться к серверу
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark/80 border-t border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">Miami RP</h3>
              <p className="text-gray-400">
                Лучший GTA 5 RP сервер с уникальными возможностями.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Игра</h4>
              <ul className="space-y-2">
                <li><button onClick={startGame} className="text-gray-400 hover:text-primary transition-colors">Как начать играть</button></li>
                <li><a href="#rules" className="text-gray-400 hover:text-primary transition-colors">Правила сервера</a></li>
                <li><a href="#guide" className="text-gray-400 hover:text-primary transition-colors">Гайды</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Поддержка</h4>
              <ul className="space-y-2">
                <li><button onClick={donate} className="text-gray-400 hover:text-secondary transition-colors">Донат</button></li>
                <li><a href="#discord" className="text-gray-400 hover:text-secondary transition-colors">Discord</a></li>
                <li><a href="#forum" className="text-gray-400 hover:text-secondary transition-colors">Форум</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Юридическое</h4>
              <ul className="space-y-2">
                <li><a href="#terms" className="text-gray-400 hover:text-accent transition-colors">Пользовательское соглашение</a></li>
                <li><a href="#privacy" className="text-gray-400 hover:text-accent transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#offer" className="text-gray-400 hover:text-accent transition-colors">Оферта</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Miami RP. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;