import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface DonatePackage {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const Donate = () => {
  const [playerName, setPlayerName] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<DonatePackage | null>(null);
  const [loading, setLoading] = useState(false);

  const donatePackages: DonatePackage[] = [
    {
      id: 'starter',
      name: 'Стартовый пакет',
      price: 299,
      currency: 'RUB',
      description: 'Идеально для новичков',
      features: ['50,000$ в игре', 'Стартовый автомобиль', 'Квартира', 'VIP статус на 7 дней'],
      color: 'secondary'
    },
    {
      id: 'premium',
      name: 'Премиум пакет',
      price: 599,
      currency: 'RUB',
      description: 'Для опытных игроков',
      features: ['150,000$ в игре', 'Премиум автомобиль', 'Дом с гаражом', 'VIP статус на 30 дней', 'Уникальная одежда'],
      popular: true,
      color: 'primary'
    },
    {
      id: 'vip',
      name: 'VIP пакет',
      price: 999,
      currency: 'RUB',
      description: 'Максимальные привилегии',
      features: ['500,000$ в игре', 'Спортивный автомобиль', 'Элитный дом', 'VIP статус на 90 дней', 'Эксклюзивная одежда', 'Приоритет в очереди'],
      color: 'accent'
    }
  ];

  // AnyPay конфигурация
  const ANYPAY_CONFIG = {
    projectId: 15804,
    secretKey: '89059293040',
    notifyUrl: 'https://miami-roleplay.ru/result',
    successUrl: 'https://miami-roleplay.ru/success',
    failUrl: 'https://miami-roleplay.ru/fail'
  };

  const createPayment = async (amount: number, description: string) => {
    setLoading(true);
    
    try {
      const orderId = `order_${Date.now()}`;
      
      // Данные для AnyPay
      const paymentData = {
        project_id: ANYPAY_CONFIG.projectId,
        amount: amount,
        currency: 'RUB',
        description: description,
        order_id: orderId,
        success_url: ANYPAY_CONFIG.successUrl,
        fail_url: ANYPAY_CONFIG.failUrl,
        // Дополнительные параметры
        player_name: playerName,
        package_id: selectedPackage?.id || 'custom'
      };

      // Создание подписи MD5 (упрощенная версия для демонстрации)
      const signString = `${paymentData.project_id}:${paymentData.amount}:${paymentData.currency}:${paymentData.order_id}:${ANYPAY_CONFIG.secretKey}`;
      
      // В реальном проекте используйте криптографическую библиотеку для MD5
      console.log('Payment data:', paymentData);
      console.log('Sign string:', signString);
      
      // Перенаправляем на форму оплаты AnyPay
      const paymentUrl = `https://anypay.io/merchant/form?project_id=${paymentData.project_id}&amount=${paymentData.amount}&order_id=${paymentData.order_id}&currency=${paymentData.currency}&description=${encodeURIComponent(paymentData.description)}&success_url=${encodeURIComponent(paymentData.success_url)}&fail_url=${encodeURIComponent(paymentData.fail_url)}`;
      
      window.open(paymentUrl, '_blank');
      
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePackagePayment = (pkg: DonatePackage) => {
    if (!playerName.trim()) {
      alert('Введите ваш игровой ник');
      return;
    }
    
    setSelectedPackage(pkg);
    createPayment(pkg.price, `${pkg.name} для игрока ${playerName}`);
  };

  const handleCustomPayment = () => {
    const amount = parseFloat(customAmount);
    
    if (!playerName.trim()) {
      alert('Введите ваш игровой ник');
      return;
    }
    
    if (!amount || amount < 50) {
      alert('Минимальная сумма доната: 50 рублей');
      return;
    }
    
    createPayment(amount, `Пожертвование ${amount} RUB для игрока ${playerName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900">
      {/* Header */}
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-4 text-lg px-4 py-2 bg-primary/20 text-primary border-primary">
            ПОДДЕРЖКА СЕРВЕРА
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            Донат <span className="text-primary">Miami RP</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Поддержи развитие сервера и получи эксклюзивные привилегии в игре
          </p>
        </div>
      </div>

      {/* Player Name Input */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="font-heading text-white flex items-center">
                <Icon name="User" size={20} className="mr-2 text-primary" />
                Данные игрока
              </CardTitle>
              <CardDescription>Укажите ваш игровой ник для зачисления привилегий</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Введите ваш игровой ник"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-dark/50 border-primary/20 focus:border-primary text-white text-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Donate Packages */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-white text-center mb-12">
            Выберите пакет
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {donatePackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105 ${
                  pkg.popular 
                    ? 'border-primary/50 ring-2 ring-primary/20' 
                    : 'border-primary/20 hover:border-primary/40'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white font-semibold px-4 py-1">
                      ПОПУЛЯРНЫЙ
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    pkg.color === 'primary' ? 'bg-primary/20' : 
                    pkg.color === 'secondary' ? 'bg-secondary/20' : 
                    'bg-accent/20'
                  }`}>
                    <Icon 
                      name={pkg.color === 'primary' ? 'Crown' : pkg.color === 'secondary' ? 'Star' : 'Gem'} 
                      size={32} 
                      className={
                        pkg.color === 'primary' ? 'text-primary' : 
                        pkg.color === 'secondary' ? 'text-secondary' : 
                        'text-accent'
                      } 
                    />
                  </div>
                  
                  <CardTitle className="font-heading text-white text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="text-xl text-gray-400 ml-2">₽</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Icon name="Check" size={16} className="text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full mt-6 font-semibold ${
                      pkg.color === 'primary' ? 'bg-primary hover:bg-primary/80' :
                      pkg.color === 'secondary' ? 'bg-secondary hover:bg-secondary/80 text-dark' :
                      'bg-accent hover:bg-accent/80 text-dark'
                    }`}
                    onClick={() => handlePackagePayment(pkg)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    ) : (
                      <Icon name="CreditCard" size={16} className="mr-2" />
                    )}
                    Купить пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Amount */}
          <Card className="bg-card/50 backdrop-blur border-secondary/20 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-white flex items-center justify-center">
                <Icon name="DollarSign" size={24} className="mr-2 text-secondary" />
                Произвольная сумма
              </CardTitle>
              <CardDescription>
                Поддержите сервер любой суммой (минимум 50 ₽)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Введите сумму"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="bg-dark/50 border-secondary/20 focus:border-secondary text-white"
                  min="50"
                />
                <Button
                  onClick={handleCustomPayment}
                  disabled={loading}
                  className="bg-secondary hover:bg-secondary/80 text-dark font-semibold px-8"
                >
                  {loading ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Heart" size={16} className="mr-2" />
                  )}
                  Донат
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Info */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <Alert className="border-primary/20 bg-primary/10">
            <Icon name="Info" size={16} />
            <AlertDescription className="text-gray-300">
              <strong className="text-white">Важная информация:</strong>
              <br />• Привилегии зачисляются автоматически в течение 5 минут после оплаты
              <br />• При проблемах с зачислением обращайтесь в Discord: miami-rp
              <br />• Возврат средств возможен только в исключительных случаях
              <br />• Платежи обрабатываются через защищенную систему AnyPay
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Donate;