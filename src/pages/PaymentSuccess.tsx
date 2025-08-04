import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Получаем данные о платеже из URL параметров
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const projectId = searchParams.get('project_id');
    
    setPaymentData({
      orderId,
      amount,
      currency,
      projectId
    });

    // Здесь можно отправить уведомление на сервер о успешной оплате
    console.log('Payment successful:', { orderId, amount, currency, projectId });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Icon name="CheckCircle" size={48} className="text-green-400" />
          </div>
          <div className="animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              Оплата прошла успешно! 🎉
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Спасибо за поддержку Miami RP! Ваши привилегии будут активированы в ближайшее время.
            </p>
          </div>
        </div>

        {/* Payment Details */}
        {paymentData && (
          <Card className="bg-card/50 backdrop-blur border-green-500/20 mb-8">
            <CardHeader>
              <CardTitle className="font-heading text-white flex items-center justify-center">
                <Icon name="Receipt" size={20} className="mr-2 text-green-400" />
                Детали платежа
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-400 text-sm">Номер заказа:</p>
                  <p className="text-white font-mono">{paymentData.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Сумма:</p>
                  <p className="text-white font-semibold">
                    {paymentData.amount} {paymentData.currency}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Проект:</p>
                  <p className="text-white">Miami RP (#{paymentData.projectId})</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Статус:</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                    Оплачено
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="bg-card/50 backdrop-blur border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="font-heading text-white flex items-center justify-center">
              <Icon name="Clock" size={20} className="mr-2 text-primary" />
              Что дальше?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Активация привилегий</h3>
                <p className="text-gray-300">Ваши привилегии будут активированы автоматически в течение 5-10 минут</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Подключение к серверу</h3>
                <p className="text-gray-300">Зайдите на сервер и наслаждайтесь новыми возможностями</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-accent font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Поддержка</h3>
                <p className="text-gray-300">При возникновении проблем обращайтесь в Discord</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/80 text-white font-semibold"
            onClick={() => window.open('fivem://connect/miami-rp.ru', '_blank')}
          >
            <Icon name="Play" size={20} className="mr-2" />
            Подключиться к серверу
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-secondary text-secondary hover:bg-secondary hover:text-dark"
            asChild
          >
            <Link to="/">
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 p-6 bg-dark/50 rounded-lg border border-primary/20">
          <h3 className="text-white font-semibold mb-3 flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
            Нужна помощь?
          </h3>
          <p className="text-gray-300 mb-4">
            Если привилегии не активировались или у вас возникли вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/10">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Discord: miami-rp
            </Button>
            <Button variant="outline" size="sm" className="border-secondary/20 text-secondary hover:bg-secondary/10">
              <Icon name="Mail" size={16} className="mr-2" />
              support@miami-rp.ru
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;