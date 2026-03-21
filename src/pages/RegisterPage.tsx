import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { UserForm } from '../components/common/UserForm';

const RegisterPage: React.FC = () => {
  return (
    <PageTransition direction="none">
      <div className="w-full flex justify-center py-10">
        <UserForm />
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
