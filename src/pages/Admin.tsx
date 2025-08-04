import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [news, setNews] = useState<NewsItem[]>([
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
  
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === 'miami2025') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    setPassword('');
  };

  const addNews = () => {
    if (!newNews.title || !newNews.content) {
      setError('Заполните заголовок и содержание');
      return;
    }

    const newId = Math.max(...news.map(n => n.id), 0) + 1;
    const newsItem: NewsItem = {
      id: newId,
      title: newNews.title,
      content: newNews.content,
      date: new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      image: newNews.image
    };

    setNews([newsItem, ...news]);
    setNewNews({ title: '', content: '', image: '' });
    setSuccessMessage('Новость успешно добавлена!');
    setError('');
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
    setSuccessMessage('Новость удалена');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-card/90 backdrop-blur border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <CardTitle className="font-heading text-2xl">Админ панель</CardTitle>
            <CardDescription>Управление новостями Miami RP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <Icon name="AlertCircle" size={16} />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-dark/50 border-primary/20 focus:border-primary"
            />
            <Button onClick={handleLogin} className="w-full bg-primary hover:bg-primary/80">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">
              Админ панель Miami RP
            </h1>
            <p className="text-gray-400">Управление новостями сервера</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-6 border-green-500/20 bg-green-500/10">
            <Icon name="CheckCircle" size={16} />
            <AlertDescription className="text-green-400">{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Add News Form */}
        <Card className="mb-8 bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="font-heading text-white flex items-center">
              <Icon name="Plus" size={20} className="mr-2 text-primary" />
              Добавить новость
            </CardTitle>
            <CardDescription>Создайте новую новость для главной страницы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <Icon name="AlertCircle" size={16} />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Заголовок</label>
              <Input
                placeholder="Введите заголовок новости"
                value={newNews.title}
                onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                className="bg-dark/50 border-primary/20 focus:border-primary text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Содержание</label>
              <Textarea
                placeholder="Введите содержание новости"
                value={newNews.content}
                onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                className="bg-dark/50 border-primary/20 focus:border-primary text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Изображение (URL)</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newNews.image}
                onChange={(e) => setNewNews({...newNews, image: e.target.value})}
                className="bg-dark/50 border-primary/20 focus:border-primary text-white"
              />
              {newNews.image && (
                <div className="mt-2">
                  <img 
                    src={newNews.image} 
                    alt="Preview" 
                    className="w-32 h-24 object-cover rounded border border-primary/20"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <Button onClick={addNews} className="w-full bg-primary hover:bg-primary/80">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить новость
            </Button>
          </CardContent>
        </Card>

        {/* News List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-white flex items-center">
            <Icon name="Newspaper" size={24} className="mr-2 text-secondary" />
            Управление новостями ({news.length})
          </h2>
          
          <div className="grid gap-6">
            {news.map((item) => (
              <Card key={item.id} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {item.image && (
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded border border-primary/20"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="border-secondary/20 text-secondary">
                            {item.date}
                          </Badge>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteNews(item.id)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/20"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{item.content}</p>
                      
                      <div className="flex items-center text-sm text-gray-400">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        Опубликовано: {item.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {news.length === 0 && (
              <Card className="bg-card/30 backdrop-blur border-dashed border-primary/20">
                <CardContent className="p-12 text-center">
                  <Icon name="Newspaper" size={48} className="mx-auto text-gray-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Нет новостей</h3>
                  <p className="text-gray-500">Добавьте первую новость для отображения на сайте</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;