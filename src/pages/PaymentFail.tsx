import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Получаем данные о неудачном платеже из URL параметров
    const orderId = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const currency = searchParams.get('currency');
    const error = searchParams.get('error') || 'Платеж отклонен';
    
    setPaymentData({
      orderId,
      amount,
      currency,
      error
    });

    // Логируем неудачный платеж
    console.log('Payment failed:', { orderId, amount, currency, error });
  }, [searchParams]);

  const retryPayment = () => {
    // Возвращаемся на страницу доната для повторной попытки
    window.location.href = '/donate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Icon name="XCircle" size={48} className="text-red-400" />
          </div>
          <div className="animate-fade-in">
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              Платеж не прошел 😔
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              К сожалению, произошла ошибка при обработке платежа. Попробуйте еще раз.
            </p>
          </div>
        </div>

        {/* Error Details */}
        <Alert className="border-red-500/20 bg-red-500/10 mb-8">
          <Icon name="AlertTriangle" size={16} />
          <AlertDescription className="text-red-400 text-left">
            <strong>Причина ошибки:</strong>
            <br />
            {paymentData?.error || 'Неизвестная ошибка при обработке платежа'}
          </AlertDescription>
        </Alert>

        {/* Payment Details */}
        {paymentData && paymentData.orderId && (
          <Card className="bg-card/50 backdrop-blur border-red-500/20 mb-8">
            <CardHeader>
              <CardTitle className="font-heading text-white flex items-center justify-center">
                <Icon name="Receipt" size={20} className="mr-2 text-red-400" />
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
              </div>
            </CardContent>
          </Card>
        )}

        {/* Possible Solutions */}
        <Card className="bg-card/50 backdrop-blur border-primary/20 mb-8">
          <CardHeader>
            <CardTitle className="font-heading text-white flex items-center justify-center">
              <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
              Возможные решения
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Проверьте баланс карты</h3>
                <p className="text-gray-300">Убедитесь, что на карте достаточно средств</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Проверьте данные карты</h3>
                <p className="text-gray-300">Убедитесь, что номер карты, срок и CVV введены правильно</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Попробуйте другой способ оплаты</h3>
                <p className="text-gray-300">Используйте другую карту или способ оплаты</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Обратитесь в банк</h3>
                <p className="text-gray-300">Возможно, банк заблокировал операцию для безопасности</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/80 text-white font-semibold"
            onClick={retryPayment}
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Попробовать снова
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
        <div className="p-6 bg-dark/50 rounded-lg border border-primary/20">
          <h3 className="text-white font-semibold mb-3 flex items-center justify-center">
            <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
            Нужна помощь?
          </h3>
          <p className="text-gray-300 mb-4">
            Если проблема повторяется, обратитесь в службу поддержки
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
          
          <div className="mt-4 pt-4 border-t border-primary/10">
            <p className="text-gray-400 text-sm">
              <Icon name="Shield" size={14} className="inline mr-1" />
              Все платежи обрабатываются через защищенную систему AnyPay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;